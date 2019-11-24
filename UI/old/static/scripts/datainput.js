   
user = JSON.parse('{{ jdata }}');

function ip()
{
 
    //document.write(Object.keys(user.hyperparameters[0])[1]);
    count = Object.keys(user.hyperparameters).length;
   // document.write(count);
   b = document.createElement("button");
   b.setAttribute("type","button");
   b.innerHTML = "Submit";
   b.setAttribute("style","font-size:16px;");
   br = document.createElement("br");
   d = document.getElementById('hyperdetails');
   x = 0;
   for( c = 0; c < count; c++)
   {
    element = document.createElement("input");
    
    c2 = Object.keys(user.hyperparameters[c]).length;
    for( c3 = 0; c3 < c2; c3++)
    {
      key = Object.keys(user.hyperparameters[c])[c3];
      element.setAttribute("type","text");
      element.setAttribute("id","i"+x.toString());
      element.setAttribute("placeholder",user.hyperparameters[c][key]);
      element.setAttribute("value","");
      
      
      d.append(element);
      
      
      
    }

    x = x+1;
  }
  b.setAttribute("onclick","details()");
  d.append(b);
}

function details() {
  for(var l = 0 ; l < x; l++)
  {
    v = document.getElementById('i'+l.toString()).value;
    
    
    element = document.createElement("input");
    
    val = "value";

    user.hyperparameters[l]["value"]=v;

    
  } 
  
}

function send() {
      // body...
      window.location.href="/gotjsondata/"+JSON.stringify(user);
    }
    