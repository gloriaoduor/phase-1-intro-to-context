// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeInfo){
    let employeeRecords = []
    employeeInfo.map(array => employeeRecords.push(createEmployeeRecord(array)))
    return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeObj
}

let hoursWorkedOnDate = function(employeeObj, soughtDate){
    let inEvent = employeeObj.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employeeObj.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employeeObj, dateSought){
    let rawWage = hoursWorkedOnDate(employeeObj, dateSought)
        * employeeObj.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employeeObj){
    let eligibleDates = employeeObj.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeObj, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(array, firstName) {
    return array.find(function(record){
      return record.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, record){
          return memo + allWagesFor(record)
      }, 0)
  }