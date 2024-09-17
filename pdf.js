const handlePdf = () =>{
    const doctor_id=new URLSearchParams(window.location.search).get("doctorId");
    const user_id=localStorage.getItem('user_id');
    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
    .then((res)=>res.json())
    .then((data) =>{
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
        .then((res) => res.json())
        .then((pdData) =>{
            const newData=[data,pdData];
            const parent =document.getElementById("pdf-container");
            const div=document.createElement("div");
            div.innerHTML = `
              <div class="pd d-flex justify-content-around align-items-center">
            <div class="patient doctor">
                <h1>${newData[1].username}</h1>
                <h1>${newData[1].first_name} ${newData[1].last_name}</h1>
                <h4>${newData[1].email}</h4>
            </div>
            <div class="doctor p-5">
            <img class="w-25" src=${newData[0].image}/>
                <h2>${newData[0].full_name}</h2>
                <h3>deg: designation</h3>
                <h5>spe: specialization</h5>
            </div>
        </div>
        <input class="symtom" type="text"/>
        <h1 class="text-center p-2 mt-5">fees : ${newData[0].fee}</h1>
            `;
            parent.appendChild(div);
        
            donwloadPdf(); 
        });
         
    });     
}; 

const donwloadPdf = () => {
    const element = document.getElementById("pdf-container");
  
    // Define the options for html2pdf
    const options = {
      margin: 10,
      filename: "appt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
  
    // Use html2pdf to generate and download the PDF
      html2pdf(element, options);
      
  };

handlePdf();