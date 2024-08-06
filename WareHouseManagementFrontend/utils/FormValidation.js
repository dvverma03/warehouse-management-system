export const EmployeeFormValidation=(employeeName, employeeEmail, employeePassword)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(employeeEmail);
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(employeePassword);
    const nameRegex=/([a-zA-Z0-9_\s]+)$/.test(employeeName);
    if(!nameRegex) return "Name is not valid"
    if(!emailRegex) return "Email should be in formate xyz@xy.xy";
    if(!passwordRegex) return "Password should be in formate Xyz@123";
    return null;
}

export const DriverFormValidation=(diverName, driverLicense, driverContact, driverAddress)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(employeeEmail);
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(employeePassword);
    const nameRegex=/([a-zA-Z0-9_\s]+)$/.test(diverName);
    if(!nameRegex) return "Name is not valid"
    if(!emailRegex) return "Email is not valid";
    if(!passwordRegex) return "Password is not valid";
    return null;
}

export const ProductFormValidation=(productName, productId, productType)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const nameRegex=/([a-zA-Z0-9_\s]+)$/.test(name);
    if(!nameRegex) return "Name is not valid"
    if(!emailRegex) return "Email is not valid";
    if(!passwordRegex) return "Password is not valid";
    return null;
}

export const VehicleFormValidation=(vehicleName, vehicleNumber, vehicleWeight, otherDetails)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const nameRegex=/([a-zA-Z0-9_\s]+)$/.test(name);
    if(!nameRegex) return "Name is not valid"
    if(!emailRegex) return "Email is not valid";
    if(!passwordRegex) return "Password is not valid";
    return null;
}