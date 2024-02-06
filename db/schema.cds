namespace FirstApp.db;

entity Employee {
    key ID: Integer;
    firstName: String;
    lastName: String;
    jobCode: String;
    address: Association to Address;
    department: Association to Department;
    company: Association to Company;
}

entity Department {
    key ID: Int32;
    Name: String;
}

entity Address {
    key AddressID: UUID;
    Street: String;
    City: String;
    State: String;
    ZipCode: Integer;
    Country: String;
}

entity Company {
    key ID: Integer;
    Name: String;
}
