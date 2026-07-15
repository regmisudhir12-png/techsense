// ---------- theme toggle ----------
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('bdn-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(saved === 'dark' || (!saved && prefersDark)){ root.setAttribute('data-theme', 'dark'); }
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', ()=>{
    const isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){ root.removeAttribute('data-theme'); localStorage.setItem('bdn-theme', 'light'); }
    else{ root.setAttribute('data-theme', 'dark'); localStorage.setItem('bdn-theme', 'dark'); }
  });
})();

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// ---------- side rail nav ----------
const sections = document.querySelectorAll('section[id]');
const rail = document.getElementById('rail');
sections.forEach(sec=>{
  const b = document.createElement('button');
  b.dataset.target = sec.id;
  b.setAttribute('aria-label', sec.id.replace('s-',''));
  b.addEventListener('click', ()=> sec.scrollIntoView({behavior:'smooth'}));
  rail.appendChild(b);
});
const railBtns = rail.querySelectorAll('button');
const railObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    const btn = rail.querySelector(`[data-target="${e.target.id}"]`);
    if(e.isIntersecting){ railBtns.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
  });
}, {threshold:0.5});
sections.forEach(s=>railObs.observe(s));

// ================= NEPAL ADMINISTRATIVE DATA =================
const PROVINCES = [
  {name:'Koshi Province', districts:['Bhojpur','Dhankuta','Ilam','Jhapa','Khotang','Morang','Okhaldhunga','Panchthar','Sankhuwasabha','Solukhumbu','Sunsari','Taplejung','Terhathum','Udayapur']},
  {name:'Madhesh Province', districts:['Bara','Dhanusa','Mahottari','Parsa','Rautahat','Saptari','Sarlahi','Siraha']},
  {name:'Bagmati Province', districts:['Bhaktapur','Chitwan','Dhading','Dolakha','Kathmandu','Kavrepalanchok','Lalitpur','Makwanpur','Nuwakot','Ramechhap','Rasuwa','Sindhuli','Sindhupalchok']},
  {name:'Gandaki Province', districts:['Baglung','Gorkha','Kaski','Lamjung','Manang','Mustang','Myagdi','Nawalparasi (East)','Parbat','Syangja','Tanahun']},
  {name:'Lumbini Province', districts:['Arghakhanchi','Banke','Bardiya','Dang Deukhuri','Rukum (East)','Gulmi','Kapilvastu','Nawalparasi (West)','Palpa','Pyuthan','Rolpa','Rupandehi']},
  {name:'Karnali Province', districts:['Dailekh','Dolpa','Humla','Jajarkot','Jumla','Kalikot','Mugu','Salyan','Surkhet','Rukum (West)']},
  {name:'Sudurpashchim Province', districts:['Achham','Baitadi','Bajhang','Bajura','Dadeldhura','Darchula','Doti','Kailali','Kanchanpur']}
];

// Nepal's 77 districts -> local level type -> local level names (752 local levels)
const LOCAL_LEVELS = {"Achham":{"Municipality":["Kamalbazar","Mangalsen","Panchadewal Binayak","Sanphebagar"],"Rural Municipality":["Bannigadhi Jayagadh","Chaurpati","Dhakari","Mellekh","Ramaroshan","Turmakhad"]},"Arghakhanchi":{"Municipality":["Bhumekasthan","Sandhikharka","Sitganga"],"Rural Municipality":["Chhatradev","Malarani","Panini"]},"Baglung":{"Municipality":["Baglung","Dhorpatan","Galkot","Jaimuni"],"Rural Municipality":["Badigad","Bareng","Kanthekhola","Nisikhola","Taman Khola","Tara Khola"]},"Baitadi":{"Municipality":["Dasharathchanda","Melauli","Patan","Purchaudi"],"Rural Municipality":["Dilasaini","Dogadakedar","Pancheshwar","Shivanath","Sigas","Surnaya"]},"Bajhang":{"Municipality":["Bungal","Jaya Prithivi"],"Rural Municipality":["Bithadchir","Chabispathivera","Durgathali","Kanda","Kedarseu","Khaptadchhanna","Masta","Surma","Talkot","Thalara"]},"Bajura":{"Municipality":["Badimalika","Budhiganga","Budhinanda","Tribeni"],"Rural Municipality":["Chhededaha","Gaumul","Himali","Pandav Gupha","Swami Kartik"]},"Banke":{"Municipality":["Kohalpur"],"Rural Municipality":["Baijanath","Duduwa","Janki","Khajura","Narainapur","Rapti Sonari"]},"Bara":{"Municipality":["Kolhabi","Mahagadhimai","Nijgadh","Pacharauta","Simroungadh"],"Rural Municipality":["Adarsh Kotwal","Baragadhi","Bishrampur","Devtal","Karaiyamai","Parwanipur","Pheta","Prasauni","Suwarna"],"Sub-Metropolitan City":["Kalaiya","Jitpur Simara"]},"Bardiya":{"Municipality":["Bansgadhi","Barbardiya","Gulariya","Madhuwan","Rajapur","Thakurbaba"],"Rural Municipality":["Badhaiyatal","Geruwa"]},"Bhaktapur":{"Municipality":["Bhaktapur","Changunarayan","Madhyapur Thimi","Suryabinayak"]},"Bhojpur":{"Municipality":["Bhojpur","Shadananda"],"Rural Municipality":["Aamchowk","Arun","Hatuwagadhi","Pauwadungma","Ramprasad Rai","Salpasilichho","Tyamkemaiyung"]},"Chitwan":{"Municipality":["Kalika","Khairahani","Madi","Rapti","Ratnangar"],"Rural Municipality":["Ichchhyakamana"],"Metropolitan City":["Bharatpur"]},"Dadeldhura":{"Municipality":["Amargadhi","Parashuram"],"Rural Municipality":["Ajaymeru","Alital","Bhageshwar","Ganayapdhura","Nawadurga"]},"Dailekh":{"Municipality":["Aathabis","Chamunda Bindrasaini","Dullu","Narayan"],"Rural Municipality":["Bhagawatimai","Bhairabi","Dungeshwor","Gurans","Mahabu","Naumule","Thantikandh"]},"Dang Deukhuri":{"Municipality":["Lamahi"],"Rural Municipality":["Babai","Banglachuli","Dangisharan","Gadhawa","Rajpur","Rapti","Shantinagar"],"Sub-Metropolitan City":["Ghorahi","Tulsipur"]},"Darchula":{"Municipality":["Mahakali","Shailyashikhar"],"Rural Municipality":["Apihimal","Byas","Dunhu","Lekam","Malikarjun","Marma","Naugad"]},"Dhading":{"Municipality":["Dhunibesi","Nilakantha"],"Rural Municipality":["Benighat Rorang","Gajuri","Galchi","Gangajamuna","Jwalamukhi","Khaniyabash","Netrawati","Rubi Valley","Siddhalek","Thakre","Tripurasundari"]},"Dhankuta":{"Municipality":["Dhankuta","Mahalaxmi","Pakhribas"],"Rural Municipality":["Chaubise","Chhathar Jorpati","Khalsa Chhintang Shahidbhumi","Sangurigadhi"]},"Dhanusa":{"Municipality":["Bidehi","Chhireshwornath","Dhanusadham","Ganeshman Charnath","Hansapur","Kamala","Mithila","Mithila Bihari","Nagarain","Sabaila","Sahidnagar"],"Rural Municipality":["Aurahi","Bateshwor","Dhanauji","Janaknandini","Lakshminiya","Mithila Bihari","Mukhiyapatti Musaharniya"],"Sub-Metropolitan City":["Janakpur"]},"Dolakha":{"Municipality":["Bhimeshwor","Jiri"],"Rural Municipality":["Baiteshwor","Bigu","Gaurishankar","Kalinchok","Melung","Sailung","Tamakoshi"]},"Dolpa":{"Municipality":["Thuli Bheri","Tripurasundari"],"Rural Municipality":["Chharka Tangsong","Dolpo Buddha","Jagadulla","Kaike","Mudkechula","Shey Phoksundo"]},"Doti":{"Municipality":["Dipayal Silgadhi","Shikhar"],"Rural Municipality":["Adharsha","Badikedar","Bogtan","Jorayal","K I Singh","Purbichauki","Sayal"]},"Gorkha":{"Municipality":["Gorkha","Palungtar"],"Rural Municipality":["Aarughat","Ajirkot","Bhimsen","Chum Nubri","Dharche","Gandaki","Sahid Lakhan","Siranchok","Sulikot"]},"Gulmi":{"Municipality":["Musikot","Resunga"],"Rural Municipality":["Chandrakot","Chatrakot","Dhurkot","Gulmidarbar","Isma","Kaligandaki","Madane","Malika","Ruru","Satyawati"]},"Humla":{"Rural Municipality":["Adanchuli","Chankheli","Kharpunath","Namkha","Sarkegad","Simkot","Tanjakot"]},"Ilam":{"Municipality":["Deumai","Ilam","Mai","Suryodaya"],"Rural Municipality":["Chulachuli","Fakphokthum","Maijogmai","Mangsebung","Rong","Sandakpur"]},"Jajarkot":{"Municipality":["Bheri","Chhedagad","Tribeni Nalagad"],"Rural Municipality":["Barekot","Junichande","Kuse","Shiwalaya"]},"Jhapa":{"Municipality":["Arjundhara","Bhadrapur","Birtamod","Damak","Gauradhaha","Kankai","Mechinagar","Shivasataxi"],"Rural Municipality":["Barhadashi","Buddhashanti","Gauriganj","Haldibari","Jhapa","Kachankawal","Kamal"]},"Jumla":{"Municipality":["Chandannath"],"Rural Municipality":["Guthichaur","Hima","Kanakasundari","Patrasi","Sinja","Tatopani","Tila"]},"Kavrepalanchok":{"Municipality":["Banepa","Dhulikhel","Mandandeupur","Namobuddha","Panauti","Panchkhal"],"Rural Municipality":["Bethanchowk","Bhumlu","Chaurideurali","Khanikhola","Mahabharat","Roshi","Temal"]},"Kailali":{"Municipality":["Bhajani","Gauriganga","Ghodaghodi","Godawari","Lamkichuha","Tikapur"],"Rural Municipality":["Bardagoriya","Chure","Janaki","Joshipur","Kailari","Mohanyal"],"Sub-Metropolitan City":["Dhangadhi"]},"Kalikot":{"Municipality":["Khandachakra","Raskot","Tilagufa"],"Rural Municipality":["Kalika","Mahawai","Naraharinath","Pachaljharana","Palata","Sanni Tribeni"]},"Kanchanpur":{"Municipality":["Bedkot","Belauri","Bhimdatta","Krishnapur","Mahakali","Punarbas","Suklaphanta"],"Rural Municipality":["Beldandi","Laljhandi"]},"Kapilvastu":{"Municipality":["Banganga","Buddhabhumi","Kapilbastu","Krishnanagar","Maharajgunj","Shivaraj"],"Rural Municipality":["Bijayanagar","Mayadevi","Suddhodhan","Yashodhara"]},"Kaski":{"Rural Municipality":["Annapurna","Machhapuchchhre","Madi","Rupa"],"Metropolitan City":["Pokhara"]},"Kathmandu":{"Municipality":["Budhanilakantha","Chandragiri","Dakshinkali","Gokarneshwor","Kageshwori Manahara","Kirtipur","Nagarjun","Shankharapur","Tarakeshwar","Tokha"],"Metropolitan City":["Kathmandu"]},"Khotang":{"Municipality":["Halesi Tuwachung","Rupakot Majhuwagadhi"],"Rural Municipality":["Ainselukhark","Barahapokhari","Diprung","Jantedhunga","Kepilasagadhi","Khotehang","Lamidanda","Sakela"]},"Lalitpur":{"Municipality":["Godawari","Mahalaxmi"],"Rural Municipality":["Bagmati","Konjyosom","Mahankal"],"Metropolitan City":["Lalitpur"]},"Lamjung":{"Municipality":["Besishahar","Madhyanepal","Rainas","Sundarbazar"],"Rural Municipality":["Dordi","Dudhpokhari","Kwholasothar","Marsyangdi"]},"Mahottari":{"Municipality":["Aurahi","Balwa","Bardibas","Bhangaha","Gaushala","Jaleswar","Loharpatti","Manra Sisawa","Matihani","Ramgopalpur"],"Rural Municipality":["Ekdanra","Mahottari","Pipra","Samsi","Sonama"]},"Makwanpur":{"Municipality":["Thaha"],"Rural Municipality":["Bagmati","Bakaiya","Bhimphedi","Indrasarowar","Kailash","Makawanpurgadhi","Manahari","Raksirang"]},"Manang":{"Rural Municipality":["Chame","Narphu","Nashong","Neshyang"]},"Morang":{"Municipality":["Belbari","Letang","Patahri Shanishchare","Rangeli","Ratuwamai","Sundarharaicha","Sunwarshi","Uralabari"],"Rural Municipality":["Budhiganga","Dhanpalthan","Gramthan","Jahada","Kanepokhari","Katahari","Kerabari","Miklajung"],"Metropolitan City":["Biratnagar"]},"Mugu":{"Municipality":["Chhayanath Rara"],"Rural Municipality":["Khatyad","Mugum Karmarong","Soru"]},"Mustang":{"Rural Municipality":["Barhagaun Muktikshetra","Dalome","Gharapjhong","Lomanthang","Thasang"]},"Myagdi":{"Municipality":["Beni"],"Rural Municipality":["Annapurna","Dhaulagiri","Malika","Mangala","Raghuganga"]},"Nawalparasi (East)":{"Municipality":["Devchuli","Gaidakot","Kawaswoti","Madhyabindu"],"Rural Municipality":["Binayee Triveni","Bulingtar","Bungdikali","Hupsekot"]},"Nawalparasi (West)":{"Municipality":["Bardaghat","Ramgram","Sunwal"],"Rural Municipality":["Palhi Nandan","Pratappur","Sarawal","Susta"]},"Nuwakot":{"Municipality":["Belkotgadhi","Bidur"],"Rural Municipality":["Dupcheshwar","Kakani","Kispang","Likhu","Meghang","Panchakanya","Shivapuri","Suryagadhi","Tadi","Tarkeshwar"]},"Okhaldhunga":{"Municipality":["Siddhicharan"],"Rural Municipality":["Champadevi","Chisankhugadhi","Khijidemba","Likhu","Manebhanjyang","Molung","Sunkoshi"]},"Palpa":{"Municipality":["Rampur","Tansen"],"Rural Municipality":["Bagnaskali","Mathagadhi","Nisdi","Purbakhola","Rainadevi Chhahara","Rambha","Ribdikot","Tinau"]},"Panchthar":{"Municipality":["Phidim"],"Rural Municipality":["Falelung","Falgunanda","Hilihang","Kummayak","Miklajung","Tumbewa","Yangwarak"]},"Parsa":{"Municipality":["Bahudaramai","Parsagadi","Pokhariya"],"Rural Municipality":["Bindabasini","Chhipaharmai","Dhobini","Jagarnathpur","Jira Bhawani","Kalikamai","Pakahamainpur","Paterwasugauli","Sakhuwa Prasauni","Thori"],"Metropolitan City":["Birgunj"]},"Parbat":{"Municipality":["Kushma","Phalebas"],"Rural Municipality":["Bihadi","Jaljala","Mahashila","Modi","Painyu"]},"Pyuthan":{"Municipality":["Pyuthan","Sworgadwary"],"Rural Municipality":["Ayirabati","Gaumukhi","Jhimruk","Mallarani","Mandavi","Naubahini","Sarumarani"]},"Ramechhap":{"Municipality":["Manthali","Ramechhap"],"Rural Municipality":["Doramba","Gokulganga","Khadadevi","Likhu","Sunapati","Umakunda"]},"Rasuwa":{"Rural Municipality":["Gosaikunda","Kalika","Naukunda","Parbatikunda","Uttargaya"]},"Rautahat":{"Municipality":["Baudhimai","Brindaban","Chandrapur","Devahi Gonahi","Gadhimai","Garuda","Gaur","Gujara","Ishanath","Katahariya","Madav Narayan","Maulapur","Paroha","Phatuwa Bijayapur","Rajdevi","Rajpur"],"Rural Municipality":["Durga Bhagawati","Yamunamai"]},"Rolpa":{"Municipality":["Rolpa"],"Rural Municipality":["Duikholi","Lungri","Madi","Runtigadi","Sukidaha","Sunchhahari","Suwarnabati","Thawang","Tribeni"]},"Rukum (East)":{"Rural Municipality":["Bhume","Putha Uttarganga","Sisne"]},"Rukum (West)":{"Municipality":["Aathbiskot","Chaurjahari","Musikot"],"Rural Municipality":["Banfikot","Sani Bheri","Tribeni"]},"Rupandehi":{"Municipality":["Devdaha","Lumbini Sanskritik","Sainamaina","Tilottama"],"Rural Municipality":["Gaidahawa","Kanchan","Kotahimai","Marchawari","Mayadevi","Omsatiya","Rohini","Sammarimai","Siyari","Sudhdhodhan"],"Sub-Metropolitan City":["Siddharthanagar","Butwal"]},"Salyan":{"Municipality":["Bagchaur","Bangad Kupinde","Sharada"],"Rural Municipality":["Chhatreshwori","Darma","Dhorchaur","Kalimati","Kapurkot","Kumakhmalika","Tribeni"]},"Sankhuwasabha":{"Municipality":["Chainpur","Dharmadevi","Khandbari","Madi","Panchakhapan"],"Rural Municipality":["Bhotkhola","Chichila","Makalu","Sabhapokhari","Silichong"]},"Saptari":{"Municipality":["Bodebarsaien","Dakneshwori","Hanumannagar Kankalani","Kanchanrup","Khadak","Rajbiraj","Saptakoshi","Shambhunath","Surunga"],"Rural Municipality":["Agnisair Krishnasavaran","Belhi Chapena","Bishnupur","Chhinnamasta","Mahadeva","Rupani","Tilathi Koiladi","Tirahut","Walan Bihul"]},"Sarlahi":{"Municipality":["Bagmati","Balara","Barahathawa","Godaita","Haripur","Haripurwa","Hariwan","Ishworpur","Kabilasi","Lalbandi","Malangawa"],"Rural Municipality":["Basbariya","Bishnu","Brahmapuri","Chakraghatta","Chandranagar","Dhankaul","Kaudena","Parsa","Ramnagar"]},"Sindhuli":{"Municipality":["Dudhouli","Kamalamai"],"Rural Municipality":["Ghanglekh","Golanjor","Hariharpurgadhi","Marin","Phikkal","Sunkoshi","Tinpatan"]},"Sindhupalchok":{"Municipality":["Barhabise","Chautara Sangachokgadhi","Melamchi"],"Rural Municipality":["Balefi","Bhotekoshi","Helambu","Indrawati","Jugal","Lisankhu Pakhar","Panchpokhari Thangpal","Sunkoshi","Tripurasundari"]},"Siraha":{"Municipality":["Dhangadhimai","Golbazar","Kalyanpur","Karjanha","Lahan","Mirchaiya","Siraha","Sukhipur"],"Rural Municipality":["Arnama","Aurahi","Bariyarpatti","Bhagawanpur","Bishnupur","Laxmipur patari","Naraha","Navarajpur","Sakhuwanankarkatti"]},"Solukhumbu":{"Municipality":["Solududhakunda"],"Rural Municipality":["Dudhkaushika","Dudhkoshi","Khumbu Pasanglahmu","Likhupike","Mahakulung","Nechasalyan","Sotang"]},"Sunsari":{"Municipality":["Barah","Duhabi","Inarwa","Ramdhuni"],"Rural Municipality":["Barju","Bhokraha","Dewanganj","Gadhi","Harinagara","Koshi"],"Sub-Metropolitan City":["Dharan","Itahari"]},"Surkhet":{"Municipality":["Bheriganga","Gurbhakot","Lekbesi","Panchpuri"],"Rural Municipality":["Barahtal","Chaukune","Chingad","Simta"],"Sub-Metropolitan City":["Birendranagar"]},"Syangja":{"Municipality":["Bhirkot","Chapakot","Galyang","Putalibazar","Waling"],"Rural Municipality":["Aandhikhola","Arjunchaupari","Biruwa","Harinas","Kaligandagi","Phedikhola"]},"Tanahun":{"Municipality":["Bhanu","Bhimad","Byas","Shuklagandaki"],"Rural Municipality":["Anbukhaireni","Bandipur","Devghat","Ghiring","Myagde","Rhishing"]},"Taplejung":{"Municipality":["Phungling"],"Rural Municipality":["Aathrai Tribeni","Maiwakhola","Meringden","Mikwakhola","Phaktanglung","Sidingba","Sirijangha","Yangwarak"]},"Terhathum":{"Municipality":["Laligurans","Myanglung"],"Rural Municipality":["Aathrai","Chhathar","Menchayam","Phedap"]},"Udayapur":{"Municipality":["Belaka","Chaudandigadhi","Katari","Triyuga"],"Rural Municipality":["Rautamai","Sunkoshi","Tapli","Udayapurgadhi"]}};

function populateProvinceSelect(sel, includeAll){
  PROVINCES.forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.name; opt.textContent = p.name;
    sel.appendChild(opt);
  });
}
const donorProvince = document.getElementById('donorProvince');
const donorDistrict = document.getElementById('donorDistrict');
const filterProvince = document.getElementById('filterProvince');
populateProvinceSelect(donorProvince);
populateProvinceSelect(filterProvince);

donorProvince.addEventListener('change', ()=>{
  const prov = PROVINCES.find(p=>p.name === donorProvince.value);
  donorDistrict.innerHTML = '';
  if(!prov){
    donorDistrict.innerHTML = '<option value="">Select province first</option>';
    donorDistrict.disabled = true;
    return;
  }
  donorDistrict.disabled = false;
  const first = document.createElement('option');
  first.value = ''; first.textContent = 'Select district';
  donorDistrict.appendChild(first);
  prov.districts.forEach(d=>{
    const opt = document.createElement('option');
    opt.value = d; opt.textContent = d;
    donorDistrict.appendChild(opt);
  });
});

// ================= DONOR DATA =================
const STORAGE_KEY = 'bdn_donors';

const SAMPLE_DONORS = [
  {name:'Sujata Rai', phone:'9800000001', blood:'O+', province:'Koshi Province', district:'Sunsari', localType:'Sub-Metropolitan City', localName:'Itahari', ward:'5', sample:true},
  {name:'Bikash Thapa', phone:'9800000002', blood:'B+', province:'Bagmati Province', district:'Kathmandu', localType:'Metropolitan City', localName:'Kathmandu', ward:'10', sample:true},
  {name:'Anita Gurung', phone:'9800000003', blood:'A−', province:'Gandaki Province', district:'Kaski', localType:'Metropolitan City', localName:'Pokhara', ward:'8', sample:true},
  {name:'Rajendra Yadav', phone:'9800000004', blood:'AB+', province:'Madhesh Province', district:'Dhanusa', localType:'Sub-Metropolitan City', localName:'Janakpur', ward:'3', sample:true},
  {name:'Manisha Chaudhary', phone:'9800000005', blood:'O−', province:'Sudurpashchim Province', district:'Kailali', localType:'Sub-Metropolitan City', localName:'Dhangadhi', ward:'12', sample:true},
  {name:'Prakash B.K.', phone:'9800000006', blood:'B−', province:'Lumbini Province', district:'Rupandehi', localType:'Sub-Metropolitan City', localName:'Siddharthanagar', ward:'6', sample:true},
  {name:'Sarita Oli', phone:'9800000007', blood:'A+', province:'Karnali Province', district:'Surkhet', localType:'Sub-Metropolitan City', localName:'Birendranagar', ward:'2', sample:true},
  {name:'Deepak Karki', phone:'9800000008', blood:'AB−', province:'Bagmati Province', district:'Lalitpur', localType:'Metropolitan City', localName:'Lalitpur', ward:'14', sample:true}
];

function getStoredDonors(){
  try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch(e){ return []; }
}
function saveStoredDonors(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
function getAllDonors(){
  return [...getStoredDonors(), ...SAMPLE_DONORS];
}

function bloodFamilyColor(blood){
  if(blood.startsWith('A') && !blood.startsWith('AB')) return 'var(--rose)';
  if(blood.startsWith('B')) return 'var(--gold)';
  if(blood.startsWith('AB')) return 'var(--maroon)';
  return 'var(--slate)';
}

// ================= TAB SWITCHING =================
const demoTabs = document.getElementById('demoTabs');
const tabBtns = demoTabs.querySelectorAll('button');
const viewRegister = document.getElementById('viewRegister');
const viewBrowse = document.getElementById('viewBrowse');

tabBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const view = btn.dataset.view;
    tabBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    demoTabs.classList.toggle('browse', view === 'browse');
    viewRegister.classList.toggle('active', view === 'register');
    viewBrowse.classList.toggle('active', view === 'browse');
    if(view === 'browse') renderDonorList();
  });
});

// ================= REGISTER FORM =================
const registerBtn = document.getElementById('registerBtn');
const registerMsg = document.getElementById('registerMsg');

registerBtn.addEventListener('click', ()=>{
  const name = document.getElementById('donorName').value.trim();
  const phone = document.getElementById('donorPhone').value.trim();
  const blood = document.getElementById('donorBlood').value;
  const province = donorProvince.value;
  const district = donorDistrict.value;
  const localType = document.getElementById('donorLocalType').value;
  const localName = document.getElementById('donorLocalName').value.trim();
  const ward = document.getElementById('donorWard').value.trim();

  const phoneOk = /^9\d{9}$/.test(phone);

  if(!name || !phoneOk || !blood || !province || !district || !localType || !localName){
    registerMsg.textContent = !phoneOk && phone ? 'Please enter a valid 10-digit phone number starting with 9.' : 'Please fill in every field before registering.';
    registerMsg.classList.remove('success');
    registerMsg.classList.remove('show');
    requestAnimationFrame(()=> registerMsg.classList.add('show'));
    return;
  }

  const donors = getStoredDonors();
  donors.push({name, phone, blood, province, district, localType, localName, ward, sample:false, registeredAt:new Date().toISOString()});
  saveStoredDonors(donors);

  registerMsg.textContent = `Thank you, ${name} — you're registered as a ${blood} donor in ${district}.`;
  registerMsg.classList.add('success');
  registerMsg.classList.remove('show');
  requestAnimationFrame(()=> registerMsg.classList.add('show'));

  ['donorName','donorPhone','donorLocalName','donorWard'].forEach(id=> document.getElementById(id).value = '');
  document.getElementById('donorBlood').value = '';
  document.getElementById('donorLocalType').value = '';
});

// ================= BROWSE / FILTER =================
const donorList = document.getElementById('donorList');
const emptyState = document.getElementById('emptyState');
const resultsCount = document.getElementById('resultsCount');
const filterBlood = document.getElementById('filterBlood');
const resetFilters = document.getElementById('resetFilters');
const clearMyData = document.getElementById('clearMyData');

function renderDonorList(){
  const provFilter = filterProvince.value;
  const bloodFilter = filterBlood.value;
  const all = getAllDonors();
  const matched = all.filter(d=>{
    return (!provFilter || d.province === provFilter) && (!bloodFilter || d.blood === bloodFilter);
  });

  donorList.innerHTML = '';
  resultsCount.textContent = `Showing ${matched.length} of ${all.length} registered donors`;

  if(matched.length === 0){
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  matched.forEach((d, i)=>{
    const card = document.createElement('div');
    card.className = 'donor-card';
    card.style.animationDelay = `${Math.min(i * 0.05, 0.4)}s`;
    card.innerHTML = `
      <div class="donor-top">
        <span class="donor-name">${escapeHtml(d.name)}</span>
        <span class="blood-badge" style="color:${bloodFamilyColor(d.blood)}; border-color:${bloodFamilyColor(d.blood)};">${escapeHtml(d.blood)}</span>
      </div>
      <div class="donor-loc">${escapeHtml(d.localName)}${d.ward ? ', Ward ' + escapeHtml(d.ward) : ''}<br>${escapeHtml(d.district)}, ${escapeHtml(d.province)}</div>
      <div class="donor-bottom">
        <a class="donor-phone" href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a>
        ${d.sample ? '<span class="sample-tag">Sample</span>' : ''}
      </div>
    `;
    donorList.appendChild(card);
  });
}
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

filterProvince.addEventListener('change', renderDonorList);
filterBlood.addEventListener('change', renderDonorList);
resetFilters.addEventListener('click', ()=>{
  filterProvince.value = '';
  filterBlood.value = '';
  renderDonorList();
});
clearMyData.addEventListener('click', ()=>{
  if(getStoredDonors().length === 0){
    registerMsg.textContent = '';
    renderDonorList();
    return;
  }
  const confirmed = confirm('This removes only the donors you registered on this device. Sample donors will remain. Continue?');
  if(confirmed){
    saveStoredDonors([]);
    renderDonorList();
  }
});

renderDonorList();
