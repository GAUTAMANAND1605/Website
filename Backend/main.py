from flask import Flask,request
from flask_pymongo import pymongo, MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# mongodb+srv://<username>:<password>@cluster0.qxvzkvw.mongodb.net/?retryWrites=true&w=majority
# client = MongoClient()
client = MongoClient('mongodb+srv://laksh:laksh@cluster0.qxvzkvw.mongodb.net/?retryWrites=true&w=majority')

db = client.gautam
contact_forms = db.contact_forms
users = db.users

@app.route("/contact_form", methods=["POST"])
def contact_form():
    # users.insert_one({'name': "namesish", 'password' : "pass"})
    print(request.form['email'])
    print(request.form['message'])
    respo = contact_forms.insert_one({"email":request.form['email'], "message": request.form['message']})
    print(respo)
    if(respo):
        return "success"
    else: 
        return "failed"
    
@app.route('/register', methods=['POST'])    
def register():
    data = request.json
    email = data.get('email')
    password= data.get('password')
    # return request.get_data['email']
    # email= request.form['email']
    # password= request.form['password']
    existing_user = users.find_one({'email': email})
    if existing_user is None: 
        users.insert_one({'email': email, 'password' : password})
        return{
            "message": "Account Created Successfully"
        }
    else:
        return {
            "message": "User already Exists !! please login"
        }
    
@app.route('/login', methods=['POST'])    
def login():
    data = request.json
    email = data.get('email')
    password= data.get('password')
    existing_user = users.find_one({'email': email})
    print(email)
    if existing_user is None:
        return {
            "message": "user not found"
        }
    else:
        if(password == existing_user['password']):
            return {
                "message": "login success"
            }
        else:
            return {
                "message": "wrong pass"
            }


    

if(__name__=="__main__"):
    app.run(port=8080,debug=True)