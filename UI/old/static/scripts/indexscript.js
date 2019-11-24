
 function login()
    {
    
      var Lform = document.getElementById('Lform');

      var details = document.createElement('input');
      details.setAttribute('id','usr');
      details.setAttribute("type","text");
      details.setAttribute("placeholder","username");

      var details2 = document.createElement('input');
      details2.setAttribute('id','usr');
      details2.setAttribute("type","text");
      details2.setAttribute("placeholder","password");

      Lform.append(details);
      Lform.append(details2);

      var b = document.createElement("input");
      b.setAttribute("id","atag");
      b.setAttribute("type","button");
      b.setAttribute("name","Submit");
      b.setAttribute("value","Submit");

      Lform.append(b);
      document.getElementById('atag').onclick = take_input; 
      
      
      
      //validate with db 
    }
    function usersignup()
    {
      var usr = document.getElementById('usr').value;
      //check and add to db
    } 
    function take_input()
    {

      alert("ho");

             
       var b = document.getElementById('Lform');
       b.style.display = "none";
    }
