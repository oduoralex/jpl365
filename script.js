// ================================
// MOBILE MENU
// ================================

const hamburger =
document.getElementById('hamburger');

const navMenu =
document.getElementById('navMenu');

if(hamburger){

  hamburger.addEventListener('click', () => {

    navMenu.classList.toggle('active');

    // Toggle hamburger icon

    if(navMenu.classList.contains('active')){

      hamburger.innerHTML = '✕';

    } else {

      hamburger.innerHTML = '☰';
    }

  });
}

// ================================
// CLOSE MENU ON LINK CLICK
// ================================

const navLinks =
document.querySelectorAll('#navMenu a');

navLinks.forEach(link => {

  link.addEventListener('click', () => {

    navMenu.classList.remove('active');

    if(hamburger){
      hamburger.innerHTML = '☰';
    }

  });

});

// ================================
// HEADER EFFECT
// ================================

const header =
document.querySelector('header');

window.addEventListener('scroll', () => {

  if(window.scrollY > 40){

    header.classList.add(
      'header-scrolled'
    );

  } else {

    header.classList.remove(
      'header-scrolled'
    );
  }
});

// ================================
// REVEAL ANIMATION
// ================================

const reveals =
document.querySelectorAll('.reveal');

const obs =
new IntersectionObserver((entries)=>{

  entries.forEach((e,i)=>{

    if(e.isIntersecting){

      setTimeout(()=>{

        e.target.classList.add(
          'visible'
        );

      }, i * 70);

      obs.unobserve(e.target);
    }
  });

},{
  threshold:0.1
});

reveals.forEach(el =>
  obs.observe(el)
);

// ================================
// BLOG READMORE
// ================================

function togglePost(
  contentId,
  triggerEl,
  openLabel,
  closeLabel
){

  const content =
  document.getElementById(contentId);

  const isOpen =
  content.classList.contains('open');

  if(isOpen){

    content.classList.remove('open');

    triggerEl.textContent =
    openLabel;

  } else {

    content.classList.add('open');

    triggerEl.textContent =
    closeLabel;
  }
}

// ================================
// CONTACT FORM
// ================================

function submitForm(){

  const fname =
  document.getElementById('firstName').value.trim();

  const sname =
  document.getElementById('secondName').value.trim();

  const email =
  document.getElementById('email').value.trim();

  const organization =
  document.getElementById('organization').value.trim();

  const msg =
  document.getElementById('message').value.trim();

  // VALIDATION

  if(
    !fname ||
    !sname ||
    !organization ||
    !email ||
    !msg
  ){

    alert(
      'Please fill in all the required details'
    );

    return;
  }

  const button =
  document.getElementById('submit-btn');

  button.innerHTML =
  'Sending...';

  button.disabled = true;

  const templateParams = {

    firstName: fname,

    name: fname,

    secondName: sname,

    organization: organization,

    message: msg,

    email: email
  };

  emailjs.send(
    "service_aeepqaz",
    "template_l2pdkvd",
    templateParams
  )

  .then(function(){

    const m =
    document.getElementById('form-msg');

    m.style.display ='block';

    // CLEAR FORM

    [
      'firstName',
      'secondName',
      'email',
      'organization',
      'message'
    ]

    .forEach(id => {

      document.getElementById(id).value='';

    });

    button.innerHTML =
    'Message Sent';

    setTimeout(()=>{

      m.style.display='none';

      button.innerHTML=
      'Send Message';

      button.disabled = false;

    },4000);

  })

  .catch(function(error){

    alert(
      'Failed to send message. Please try again.'
    );

    console.error(
      'EmailJS Error:',
      error
    );

    button.innerHTML =
    'Send Message';

    button.disabled = false;
  });
}