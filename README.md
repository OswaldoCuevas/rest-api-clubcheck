# rest-api-clubcheck
## objects
### customer object
#### {
####   &nbsp;&nbsp;&nbsp;&nbsp;"id": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"name": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"url_img": sting   
#### }
### attendance object
#### {
####   &nbsp;&nbsp;&nbsp;&nbsp;"id": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"customer": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour1": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour2": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour3": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour4": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour5": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour6": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour7": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour8": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour9": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour10": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour11": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour12": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour13": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour14": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour15": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour16": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour17": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour18": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour19": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour20": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour21": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour22": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour23": int,
####   &nbsp;&nbsp;&nbsp;&nbsp;"Hour24": int
#### }
### users object
#### {
####   &nbsp;&nbsp;&nbsp;&nbsp;"id": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"customer": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"name": string
####  }
### subscription object
####  {
####   &nbsp;&nbsp;&nbsp;&nbsp;"id": int,
####   &nbsp;&nbsp;&nbsp;&nbsp; "user": string,
####   &nbsp;&nbsp;&nbsp;&nbsp; "name": string,
####   &nbsp;&nbsp;&nbsp;&nbsp;"start_date": date,
####   &nbsp;&nbsp;&nbsp;&nbsp;"ending_date": date,
####   &nbsp;&nbsp;&nbsp;&nbsp;"days_remaining": int
### }
## endpoints
### customer
#### GetCustomer (GET)  host/api/customers/:id
#### AddCustomer (POST) host/api/customers
#### EditCustomer (PATCH) host/api/customers
#### Sync (POST) host/api/customers/sync
##### {
##### &nbsp;&nbsp;&nbsp;&nbsp;users : [user object]    
##### &nbsp;&nbsp;&nbsp;&nbsp;subscriptions : [subscription object],
##### &nbsp;&nbsp;&nbsp;&nbsp;customer : customer object,
##### &nbsp;&nbsp;&nbsp;&nbsp;attendances : attendance object,
##### }  
### attendances
#### GetAttendance  (GET) host/api/attendances/:id
#### AddAttendance  (POST) host/api/attendances
#### EditAttendance (PATCH) host/api/attendances/:id
### users
#### GetUsers (POST) host/api/users/code
#### AddUsers (POST) host/api/users/
#### AddListUsers (POST) host/api/users/list
#### Sync (POST) host/api/users/sync
#### req "id"(user code)
##### {
##### &nbsp;&nbsp;&nbsp;&nbsp;users : user object    
##### &nbsp;&nbsp;&nbsp;&nbsp;subscriptions : [subscription object],
##### &nbsp;&nbsp;&nbsp;&nbsp;customer : customer object,
##### &nbsp;&nbsp;&nbsp;&nbsp;attendances : attendance object,
##### } 

### subscriptions
#### GetListSubscription (POST) host/api/subscriptions/list/get
#### AddListSubscription (POST) host/api/subscriptions/list/add
#### AddSubscription (POST) host/api/subscriptions

