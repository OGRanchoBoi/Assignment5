function MenuChoice()

{
    if (document.getElementById("menu").value == "View Customers")
    {
        document.getElementById("getAllCustomers").style.visibility="visible";
        document.getElementById("getOrderHistory").style.visibility="hidden";
        document.getElementById("getCustomersOrder").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "View Order History")
    {
        document.getElementById("getAllCustomers").style.visibility="hidden";
        document.getElementById("getOrderHistory").style.visibility="visible";
        document.getElementById("getCustomersOrder").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "View Customer Order")
    {
        document.getElementById("getAllCustomers").style.visibility="hidden";
        document.getElementById("getOrderHistory").style.visibility="hidden";
        document.getElementById("getCustomersOrder").style.visibility="visible";
    }
    else
    {
        document.getElementById("getAllCustomers").style.visibility="hidden";
        document.getElementById("getOrderHistory").style.visibility="hidden";
        document.getElementById("getCustomersOrder").style.visibility="hidden";
    }
}


function GetCustomers()

{
    var objRequest = new XMLHttpRequest();
    
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    objRequest.onreadystatechange = function()
    
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateCustomerOutput(output);
            
        }
    };
    // initiates the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function GenerateCustomerOutput(result)

{
    var count = 0;
    var displaytest ="<table><tr><th> CustomerID </th><th> Company Name </th><th> City </th></tr>";
   
    
    // Loops to extract data from the response object
    
    
    
    for (count = 0; count < result.GetAllCustomersResult.length; count ++)
    {
        
        displaytest += "<tr><td> " + result.GetAllCustomersResult[count].CustomerID + " </td><td> " + result.GetAllCustomersResult[count].CompanyName + " </td><td> " + result.GetAllCustomersResult[count].City + "<br>";
        
    }
    
    displaytest += "</table>";
    
    document.getElementById("displayAllCustomers").innerHTML = displaytest;
    
}

function OrderHistory()

{
    var objRequest2 = new XMLHttpRequest(); // Create AJAX request object
    
    //Create URL and Query String
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("inputOrderHistory").value;
    
    // Checks that the object has returned the data
    
    objRequest2.onreadystatechange = function ()
    
    {
        if (objRequest2.readyState == 4 && objRequest2.status == 200)
        
        {
            var output = JSON.parse (objRequest2.responseText);
            GenerateHistoryOutput(output);
        }
    };
    
    // Initiate Server Request
    
    objRequest2.open("GET" , url, true);
    objRequest2.send();
    
}

function GenerateHistoryOutput(result)

{
    var count = 0;
    var displaytext = "<table><tr><th> Product Name </th><th> Total Product Quantity Ordered </th></tr>";
    
    // Loops to extract data from response object
    
    for (count = 0; count < result.length; count ++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td><br>";
        
    }
    displaytext += "</table>";
    document.getElementById("displayOrderHistory").innerHTML = displaytext;
}

function CustomerOrder()

{
    var objRequest = new XMLHttpRequest();
    
    //Create URL and Query String
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("inputAllCustomers").value;
    
    //Checks that the object has returned data
    
    objRequest.onreadystatechange = function()
    
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            
            GenerateOutput(output);
        }
    };
    
    //initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function GenerateOutput(result)

{
    var count = 0;
    
    var displaytext = "<table><tr><th> Order Date </th><th> Order ID </th><th> Ship Address </th><th> City </th><th> Shipping Name </th><th> Post Code </th><th> Shipped Date </th></tr>";
    
    // Loop to extract data from the response object
    
    for (count =0; count < result.GetOrdersForCustomerResult.length; count++)
    
    {
        displaytext += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></br>";
        
    }
    document.getElementById("displayCustOrder").innerHTML = displaytext;
}

