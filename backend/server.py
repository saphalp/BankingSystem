from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import uuid
import random

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="AkgD55s1!@#$",
        database="fantastic_five"
)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        if (email.split('@')[1]=='fantasticfive.com'): 
            query = "SELECT eid, job_role FROM employee WHERE email = %s AND password = %s"
            cursor.execute(query, (email, password))
            employee = cursor.fetchone()
            if employee:
                return jsonify({
                    "eid": employee['eid'],
                    "role": employee['job_role'],
                }), 200
            else:
                return jsonify({"error": "Invalid email or password for employee"}), 401
        else:
            query = "SELECT ssn, fname, lname FROM customer WHERE email = %s AND password = %s"
            cursor.execute(query, (email, password))
            customer = cursor.fetchone()

            if customer:
                return jsonify({
                    "ssn": customer['ssn'],
                    "fname": customer['fname'],
                    "lname": customer['lname']
                }), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401

    finally:
        cursor.close()
        conn.close()



@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = get_db_connection()
    conn.autocommit = False
    cursor = conn.cursor()

    try:
        acc_no = "ACC-" + str(uuid.uuid4().hex[:10]).upper()
        customer_query = """
        INSERT INTO customer 
        (ssn, fname, lname, phone, dob, email, password, address)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(customer_query, (
            data['ssn'],
            data['firstName'],
            data['lastName'],
            data['phoneNumber'],
            data['dob'],
            data['email'],
            data['password'],
            (data['streetAddress'] + ", " + data['city'] + ", " + data['state'] + ", " + data['zipCode'])
        ))
        cursor.execute("INSERT INTO account (acc_no) VALUES (%s)", (acc_no,))
        cursor.execute(
            "INSERT INTO opens (ssn, acc_no) VALUES (%s, %s)",
            (data['ssn'], acc_no)
        )
        if data['accountType'] == "Savings":
            cursor.execute(
                "INSERT INTO savings (acc_no, rate) VALUES (%s, %s)",
                (acc_no, 2)
            )

        elif data['accountType'] == "Checking":
            cursor.execute(
                "INSERT INTO checking (acc_no, min_balance) VALUES (%s, %s)",
                (acc_no, 500)
            )

        else:
            return jsonify({"error": "Invalid account type"}), 400

        conn.commit()

        return jsonify({
            "message": "Account created successfully",
        }), 200

    except Exception as e:
        conn.rollback()
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 400

    finally:
        cursor.close()
        conn.close()

@app.route('/get_user/<int:user_id>', methods=['GET'])
def getAccountDetails(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        SELECT c.fname, c.balance, a.acc_no
        FROM customer c
        JOIN opens o ON c.ssn = o.ssn
        JOIN account a ON o.acc_no = a.acc_no
        WHERE c.ssn = %s
    """

    cursor.execute(query, (user_id,))
    results = cursor.fetchall()
    cursor.close()

    if not results:
        return {"error": "User not found"}, 404

    name = results[0][0]
    balance = float(results[0][1])

    accounts = []
    for row in results:
        accounts.append(row[2]) 
    return {
        "ssn": user_id,
        "name": name,
        "balance": balance,
        "accounts": accounts
    }, 200



@app.route('/get_transactions/<int:user_id>', methods=['GET'])
def getTransactions(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            SELECT t.tid, t.tdate, t.amount, t.t_type, t.dest_acc_no, t.dest_rout_no, t.acc_no
            FROM transactions t
            JOIN opens o ON t.acc_no = o.acc_no
            WHERE o.ssn = %s
            ORDER BY t.tdate DESC
        """

        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        cursor.close()

        if not results:
            return {"error": "No transactions found for this user"}, 404

        transactions = []
        for row in results:
            transactions.append([
                row[0],
                row[1].strftime("%Y-%m-%d %H:%M:%S") if row[1] else None,
                row[3],
                row[4],
                float(row[2])
            ])

        return {"user_id": user_id, "transactions": transactions}, 200

    except Exception as e:
        print("ERROR fetching transactions:", str(e))
        return {"error": str(e)}, 500

@app.route('/make_transaction', methods=['POST'])
def makeTransaction():
    try:
        data = request.json
        acc_no = data["acc_no"]          
        amount = data["amount"]
        t_type = data["t_type"]
        current_balance = data['curr_bal']
        if (t_type=="TRANSFER"):
            dest_rout_no = data["dest_rout_no"]
            dest_acc_no = data["dest_acc_no"]  
            conn = get_db_connection()
            cursor = conn.cursor()
            query = """
                INSERT INTO transactions (amount, t_type, dest_acc_no, dest_rout_no, acc_no)
                VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query, (amount, t_type, dest_acc_no, dest_rout_no, acc_no))
            conn.commit()
        else:
            loan_id = data['loan_id']
            conn = get_db_connection()
            cursor = conn.cursor()
            query = """INSERT INTO repayment (loan_id, rdate, amount)
            VALUES (%s, NOW(), %s)
            """
            cursor.execute(query, (loan_id, amount))
            query = """
                INSERT INTO transactions (amount, t_type, acc_no)
                VALUES (%s, %s, %s)
            """
            cursor.execute(query, (amount, t_type, acc_no))
            conn.commit()
        new_balance = current_balance - amount
        query = """
                UPDATE customer c
                JOIN opens o ON c.ssn = o.ssn
                SET c.balance = %s
                WHERE o.acc_no = %s
            """
        cursor.execute(query, (new_balance, acc_no))
        conn.commit()
        cursor.close()
        return {
                "message": "Transaction successful"
        }, 200

    except Exception as e:
        print("ERROR making transaction:", str(e))
        return {"error": str(e)}, 500

@app.route('/apply_loan/<int:user_id>', methods=['POST'])
def applyLoan(user_id):
    data = request.json
    loan_amt = data["loan_amt"]
    loan_term = data["loan_term"]
    rate = 12 
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO loan (loan_amt, loan_term, rate)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (loan_amt, loan_term, rate))
        conn.commit()
        loan_id = cursor.lastrowid
        cursor.execute(
            "INSERT INTO takes (loan_id, ssn) VALUES (%s, %s)",
            (loan_id, user_id)
        )
        conn.commit()
        conn.close()

        return jsonify({
            "message": "Loan applied successfully",
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_accounts', methods=['GET'])
def getAccounts():
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        SELECT 
            c.fname, 
            c.lname, 
            o.acc_no, 
            c.balance,
            CASE 
                WHEN s.acc_no IS NOT NULL THEN 'Savings'
                ELSE 'Checking'
            END AS account_type,
            c.debit_card_no
        FROM customer c
        JOIN opens o ON c.ssn = o.ssn
        LEFT JOIN savings s ON o.acc_no = s.acc_no
    """

    cursor.execute(query)
    result = cursor.fetchall()

    accounts = []
    for row in result:
        accounts.append([
            row[0] + ' ' + row[1], 
            row[5],  
            row[2],                 
            row[4],                
            float(row[3]),         
        ])

    cursor.close()
    conn.close()

    return accounts

@app.route('/update_account/<user_id>', methods=['DELETE', 'PATCH'])
def updateAccount(user_id):
    if request.method == 'DELETE':
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "DELETE FROM account WHERE acc_no = %s"
        cursor.execute(query, (user_id,))
        query = """
        DELETE FROM customer
        WHERE ssn NOT IN (SELECT ssn FROM opens)
        """
        cursor.execute(query)
        conn.commit()
        conn.close()
        return jsonify({"message": "Accounts deleted successfully"}), 200
    elif request.method == 'PATCH':
        print("reached patch")
        card_number = generate_debit_card_number()
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE customer c
            JOIN opens o ON c.ssn = o.ssn
            SET c.debit_card_no = %s
            WHERE o.acc_no = %s;
        """
        cursor.execute(query, (card_number, user_id))
        conn.commit()
        conn.close()
        return jsonify({
            "message": "Debit card generated",
            "card_number": card_number
        }), 200


@app.route('/get_loans', methods=['GET'])
def getLoans():
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
    SELECT 
    l.loan_id,
    CONCAT(c.fname, ' ', c.lname) AS customer_name,
    l.loan_amt,
    l.loan_term,
    l.rate AS interest,
    l.status
    FROM takes t
    JOIN customer c ON t.ssn = c.ssn
    JOIN loan l ON t.loan_id = l.loan_id
    WHERE l.status = 'under review'
    ;
    """
    cursor.execute(query)
    result = cursor.fetchall()

    loans = []
    for row in result:
        loans.append([
            row[0], 
            row[1],  
            float(row[2]),                 
            float(row[3]),                
            float(row[4]),
            row[5]        
        ])

    cursor.close()
    conn.close()

    return loans


@app.route('/get_user_loans/<int:user_id>', methods=['GET'])
def get_user_loans(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
    SELECT 
    l.loan_id,
    CONCAT(c.fname, ' ', c.lname) AS customer_name,
    l.loan_amt,
    l.loan_term,
    l.rate AS interest,
    l.status
    FROM takes t
    JOIN customer c ON t.ssn = c.ssn
    JOIN loan l ON t.loan_id = l.loan_id
    WHERE c.ssn = %s AND l.status = 'active'
    ;
    """
    cursor.execute(query, (user_id, ))
    result = cursor.fetchall()

    loans = []
    for row in result:
        loans.append(
            row[0]       
        )

    cursor.close()
    conn.close()
    return loans

@app.route('/update_loan/<int:loan_id>', methods=['DELETE', 'PATCH'])
def updateLoan(loan_id):
    if request.method == 'DELETE':
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM loan WHERE loan_id = %s", (loan_id,))
        conn.commit()
        conn.close()
        return jsonify({"message": "Loan declined successfully"}), 200
    elif request.method == 'PATCH':
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            UPDATE loan l
            SET status = 'active'
            WHERE loan_id = %s;
        """
        cursor.execute(query, (loan_id,))
        conn.commit()
        conn.close()
        return jsonify({
            "message": "Loan Approved",
        }), 200
    
@app.route('/get_analytics', methods=['GET'])
def get_analytics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM fantastic_five.bank_dashboard_stats")
        result = cursor.fetchall()
        print(result)
        return result
    except:
        return "Error fetching analytics"
    
@app.route('/get_employees', methods=['GET'])
def get_employees():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT eid, full_name, email, job_role FROM fantastic_five.employee WHERE job_role!='Bank Manager'")
        result = cursor.fetchall()
        cursor.close()
        conn.close()
        return result
    except:
        return "Error fetching employees"
    
@app.route('/update_role', methods=['PATCH'])
def update_role():
    try:
        data = request.json
        conn = get_db_connection()
        cursor = conn.cursor()
        eid = data['eid']
        new_role = data['new_role']
        query = """
        UPDATE employee SET job_role=%s WHERE eid=%s
        """
        cursor.execute(query, (new_role, eid))
        conn.commit()
        conn.close()
        return "Updated employee role"
    except:
        return "Error fetching employees"

    

def generate_debit_card_number():
    prefix = "4"
    number = prefix + ''.join(str(random.randint(0, 9)) for _ in range(14))
    def luhn_checksum(card_number):
        total = 0
        reverse_digits = card_number[::-1]
        
        for i, digit in enumerate(reverse_digits):
            n = int(digit)
            if i % 2 == 0:
                n *= 2
                if n > 9:
                    n -= 9
            total += n
        
        return total % 10
    
    checksum = luhn_checksum(number)
    check_digit = (10 - checksum) % 10
    
    return number + str(check_digit)

if __name__=="__main__":
    app.run(debug=True)