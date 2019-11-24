selectedModel = "";
		function chose()
        {
            var e = document.getElementById('first');
            var e1 = document.getElementById('second');
            var e2 = document.getElementById('third');

            e.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 20px;");
            e1.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");
            e2.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");

            e.setAttribute("style","background-color:lightblue;width:250px; height:100px;padding-top: 20px;");
            selectedModel = "K-Means Clustering";
        }
        function chose2()
        {
            var e = document.getElementById('first');
            var e1 = document.getElementById('second');
            var e2 = document.getElementById('third');

            e.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 20px;");
            e1.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");
            e2.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");

            e1.setAttribute("style","background-color:lightblue;width:250px; height:100px;padding-top: 10px;");
            selectedModel = "Multi-layer Neural Networks";
        }
        function chose3()
        {
            var e = document.getElementById('first');
            var e1 = document.getElementById('second');
            var e2 = document.getElementById('third');

            e.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 20px;");
            e1.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");
            e2.setAttribute("style","background-color:#D3D3D3;width:250px; height:100px;padding-top: 10px;");

            e2.setAttribute("style","background-color:lightblue;width:250px; height:100px;padding-top: 10px;");
            selectedModel = "Support Vector Machines";
        }
        