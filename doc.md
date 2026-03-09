# ------------- Authentication APIs


# ------------- Client Details

| Method | API                              | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/api/clients/add-client`        | Add Client + Address     |
| GET    | `/api/clients/client-list`       | Client List              |
| GET    | `/api/clients/view-client/:id`   | Client + Address Details |
| PUT    | `/api/clients/edit-client/:id`   | Update Client + Address  |
| DELETE | `/api/clients/delete-client/:id` | Delete Client + Address  |

Request Body: Add Client
{
  "user_id": 2,
  "firstname": "Avinash",
  "lastname": "J.",
  "phoneno": "9999999999",
  "email": "Avi@gmail.com",
  "gender": "Male",
  "dateofbirth": "1998-05-11",
  "city": "Phaltan",
  "created_by": 1,

  "addressline1": "Wakad1",
  "addressline2": "Bhumkar chauk1",
  "state": "Maharashtra",
  "country": "India",
  "pincode": "411001"
}


