const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*70);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.1});
reveals.forEach(el=>obs.observe(el));

function submitForm(){
  const fname=document.getElementById('firstName').value.trim();
  const sname=document.getElementById('secondName').value.trim();
  const email=document.getElementById('email').value.trim();
  const organization=document.getElementById('organization').value.trim();
  const msg=document.getElementById('message').value.trim();

  if(!fname||!sname||!organization||!email||!msg){
    alert('Please fill in all the required details');
    return;
  }

  const templateParams = {
    firstName: fname,
    name: fname,
    secondName: sname,
    organization: organization,
    message: msg,
    email: email
  };

  emailjs.send("service_aeepqaz", "template_l2pdkvd", templateParams)
    .then(function(response){
      
      const m=document.getElementById('form-msg');
      m.style.display='block';

      ['firstName','secondName','email','organization','message']
        .forEach(id=>document.getElementById(id).value='');

    })
    .catch(function(error){
      alert('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    });
}