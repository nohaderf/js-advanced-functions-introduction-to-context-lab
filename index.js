// Your code here
function createEmployeeRecord(array){
    const employee = {firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employeeData){
   return employeeData.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10),
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(function(matchDate){
        return matchDate.date === date
    })

    let timeOut = employee.timeOutEvents.find(function(matchDate){
        return matchDate.date === date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(employeeData){
        return employeeData.date
    })
    let salary = dates.reduce(function(string, date){
        return string + wagesEarnedOnDate(employee, date)
    }, 0)
    return salary
}

function calculatePayroll(employeeArray){
    return employeeArray.reduce(function(string, record){
        return string + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(employeesArray, firstName){
    return employeesArray.find(function(record){
        return record.firstName === firstName
    })
}