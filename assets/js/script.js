var navigation = {
  destText: document.querySelector('.home__destaquesText'),
  swiperSlider: document.querySelector('.swiper-wrapper'),
  fixDestText: () => {
    navigation.destText.style.width = `${navigation.swiperSlider.clientWidth}px`;
    navigation.destText.style.height = `${navigation.swiperSlider.clientHeight}px`;
  },
  header: {
    padrao: document.querySelector('.padrao'),
    secundario: document.querySelector('.secundario'),
    update: () => {
      if (!navigation.menuExpended.menuIsOpen){
        if (scrollY == 0){
          navigation.header.padrao.style.display = 'block';
          navigation.header.secundario.style.display = 'none';
        } else {
          navigation.header.padrao.style.display = 'none';
          navigation.header.secundario.style.display = 'block';
        }
      }
    }
  },
  swiper: new Swiper('.mySwiper', {
    cssMode: true,
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 5000
    },
    mousewheel: false,
    keyboard: false
  }),
  menuExpended: {
    btPadrao: document.querySelector('#btMenuPadrao'),
    btSecundario: document.querySelector('#btMenuSecundario'),
    imgBtn: document.querySelector('.navigation__menuButton2'),
    navigator: document.querySelector('#menuExpended'),
    btnNavigation: document.querySelector('.navigationBtns'),
    menuIsOpen: false,
    open: () => {
      navigation.menuExpended.navigator.classList.add('menuOpen');
      navigation.header.padrao.style.display = 'none';
      navigation.header.secundario.style.display = 'block';
      navigation.menuExpended.btnNavigation.style.display = 'block';
      navigation.menuExpended.menuIsOpen = true;
      navigation.menuExpended.imgBtn.src = './assets/img/closeIco.svg';
      document.body.classList.add('menuExpendedOpen');
    },
    close: () => {
      navigation.menuExpended.navigator.classList.remove('menuOpen');
      navigation.menuExpended.btnNavigation.style.display = 'none';
      navigation.menuExpended.menuIsOpen = false;
      navigation.menuExpended.imgBtn.src = './assets/img/menu_hamburgerBlack.svg';
      document.body.classList.remove('menuExpendedOpen');
      navigation.header.update();     
    },
    openOrClose: () => {
      if(!navigation.menuExpended.menuIsOpen)
        navigation.menuExpended.open();
      else
        navigation.menuExpended.close();             
    }
  },
  form: {
    data: document.querySelector("#data"),
    formatVisualDate: () => {
      if(navigation.form.data.value != ''){
        navigation.form.data.type='datetime-local';
      }else{
        navigation.form.data.type='text'; 
        navigation.form.data.placeholder='Data e horário*'
      }
    }    
  },
  btnBackTopClassList: backToTopButton.classList,
  backToTopButton: {
    show: () => navigation.btnBackTopClassList.add('show'),
    hidden: () => navigation.btnBackTopClassList.remove('show'),
    onScrollEvent: () => {
      if (scrollY > 550) navigation.backToTopButton.show();
      else navigation.backToTopButton.hidden();
    }
  },
  activateMenuAtCurrentSection: section => {
    const targetLine = scrollY + innerHeight / 2;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const menuElement = document.querySelector(
      `.linksSecundarios a[href*=${section.getAttribute('id')}]`
    );
    menuElement.classList.remove('active');
    if (
      targetLine >= sectionTop &&
      !(sectionTop + sectionHeight <= targetLine)
    ) {
      menuElement.classList.add('active');
    }
  },
  sections: [home, cardapio, reservas, localizacao],
  scrollEvent: () => {
    navigation.header.update();
    navigation.backToTopButton.onScrollEvent();
    navigation.sections.forEach(item => {
      navigation.activateMenuAtCurrentSection(item);
    });
  }
};

navigation.menuExpended.btPadrao.addEventListener('click', () => navigation.menuExpended.openOrClose());
navigation.menuExpended.btSecundario.addEventListener('click', () => navigation.menuExpended.openOrClose());
document.addEventListener('scroll', () =>  navigation.scrollEvent());
window.onresize = navigation.fixDestText;
navigation.scrollEvent();
navigation.fixDestText();

const tel = document.getElementById('telefone');

tel.addEventListener('keypress', (e) => mascaraTelefone(e.target.value));
tel.addEventListener('change', (e) => mascaraTelefone(e.target.value));

const mascaraTelefone = (valor) => {
  valor = valor.replace(/\D/g, "");
  valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
  valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
  tel.value = valor;
};

var btSend = document.querySelector('#enviarForm');

btSend.addEventListener('click', () => {
  let nomeReserva = document.querySelector("#nome").value;
  let telefoneReserva = document.querySelector("#telefone").value;
  let dataHoraReserva = document.querySelector("#data").value;
  let nDePessoasReserva = document.querySelector("#pessoas").value;
  let complementoReserva = document.querySelector("#complemento").value;

  if (nomeReserva == '' ){
    alert('O campo de nome é obrigatório!!!');
    return;
  } else if (telefoneReserva == '' ){
    alert('O campo de telefone é obrigatório!!!');
    return;
  } else if (dataHoraReserva == '' ){
    alert('O campo de data e hora é obrigatório!!!');
    return;
  } else if (nDePessoasReserva == '' ){
    alert('O campo de Nº de pessoas é obrigatório!!!');
    return;
  }
});

