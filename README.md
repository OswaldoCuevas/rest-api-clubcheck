# rest-api-clubcheck
## objects
### customer object
#### {
####   "id": string,
####   "name": string,
####   "url_img": sting   
#### }
### attendances object
#### {
####   "id": int,
####   "customer": string,
####   "Hour1": int,
####   "Hour2": int,
####   "Hour3": int,
####   "Hour4": int,
####   "Hour5": int,
####   "Hour6": int,
####   "Hour7": int,
####   "Hour8": int,
####   "Hour9": int,
####   "Hour10": int,
####   "Hour11": int,
####   "Hour12": int,
####   "Hour13": int,
####   "Hour14": int,
####   "Hour15": int,
####   "Hour16": int,
####   "Hour17": int,
####   "Hour18": int,
####   "Hour19": int,
####   "Hour20": int,
####   "Hour21": int,
####   "Hour22": int,
####   "Hour23": int,
####   "Hour24": int
#### }
### users object
#### {
####   "id": string,
####   "customer": string,
####   "name": string
####  }
### subscriptions object
####  {
####   "id": int,
####   "user": string,
####   "name": string,
####   "start_date": date,
####   "ending_date": date,
####   "days_remaining": int
### },
## endpoints
### customer
#### GetCustomer (GET)  host/api/customers/:id
#### AddCustomer (POST) host/api/customers
#### EditCustomer (PATCH) host/api/customers
### attendances
#### GetAttendance  (GET) host/api/attendances/:id
#### AddAttendance  (POST) host/api/attendances
#### EditAttendance (PATCH) host/api/attendances/:id
### users
#### GetUsers (POST) host/api/users/code
#### AddUsers (POST) host/api/users/
#### AddListUsers (POST) host/api/users/list
#### OutBoundSync (POST) host/api/users/outbound_sync
#### InComingSync (POST) host/api/users/incoming_sync
### subscriptions
#### GetListSubscription (POST) host/api/subscriptions/list/get
#### AddListSubscription (POST) host/api/subscriptions/list/add
#### AddSubscription (POST) host/api/subscriptions

