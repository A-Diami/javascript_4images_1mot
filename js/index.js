//const img = document.getElementsByClassName('tableLettre')
const table = document.querySelectorAll('.tableLettre')
var mots = ['ÉTÉ', 'BALLON','HEURE','BLANC','COUP'];
var images = [
    ['A.jpg','B.jpg','C.jpg','ete3.jpg'],
    ['J.jpg','K.jpg','L.jpg','M.jpg'],
    ['N.jpeg','O.jpg','P.jpg','Q.jpg'],
    ['mariage.jpg','docteur.jpg','neige.jpg','voiture.jpg'],
    ['E.jpg','F.jpg','H.jpg','I.jpg'],
];
var lettres = [
    ['A', 'Z', 'T', 'É', 'R', 'H', 'S', 'É', 'B', 'U'],
    ['A', 'L', 'T', 'L', 'O', 'H', 'S', 'É', 'B', 'N'],
    ['R', 'L', 'T', 'E', 'O', 'H', 'S', 'E', 'B', 'U'],
    ['A', 'L', 'T', 'L', 'O', 'B', 'S', 'C', 'B', 'N'],
    ['U', 'L', '0', 'L', 'O', 'H', 'P', 'É', 'B', 'C'],
];
//console.log(lettres);
var niveau = -1;
var choix = document.getElementsByClassName("choix");
var choisi = document.getElementsByClassName("case");
var nbrLettreSaisi = 0;
// augmenter l niveau
function nextlevel()
{
    niveau++;
    if(niveau > 4)
    {
        niveau = 0;
    }
    initialiseNiveau(niveau);
}
// Initialise le niveau
function initialiseNiveau(x)
{
    var img = document.getElementsByClassName("imageJeu");
    for(let i=0; i<img.length; i++)
    {
        var chemin = "img/";
        var image = chemin+images[x][i];
        img[i].setAttribute('src',image);
    }

    // choix des lettres
    var cases = document.getElementsByClassName("choix");
    for(let i=0; i<cases.length; i++)
    {
        cases[i].textContent = lettres[x][i];
        cases[i].setAttribute('ok','1');
    }
    // vider les cases et ajouter le nombre de case corespondant a chaque mot

    var divLettres = document.getElementById('divLettreReponse');
    divLettres.innerHTML = '';

    for(let i=0; i<mots[x].length; i++)
    {
        divLettres.innerHTML += '<a class="case" ok="0"></a>';
    }
    nbrLettreSaisi = 0;
    choix = document.getElementsByClassName("choix");
    choisi = document.getElementsByClassName("case");
    for(let i=0; i<choix.length; i++)
    {
        choix[i].onclick = function()
        {
            if(choix[i].getAttribute('ok') === '1')
            {
                pos = -1;
                for(let j=0; j<choisi.length; j++)
                {
                    if(choisi[j].getAttribute('ok') === '0')
                    {
                        pos = j;
                        break;
                    }
                }
                if(pos !== -1)
                {
                    choisi[pos].textContent = choix[i].textContent;
                    choisi[pos].setAttribute('ok','1');
                    choix[i].setAttribute('ok','0');
                    choix[i].textContent = '';
                    nbrLettreSaisi++;
                    if(nbrLettreSaisi === mots[niveau].length)
                    {
                        verifierMot();
                    }
                }
            }
        }
    }

    for(let i=0; i<choisi.length; i++)
    {
        choisi[i].onclick = function()
        {
            if(choisi[i].getAttribute('ok') === '1')
            {
                pos = -1;
                for(let j=0; j<choix.length; j++)
                {
                    if(choix[j].getAttribute('ok') === '0')
                    {
                        pos = j;
                        break;
                    }
                }
                if(pos !== -1)
                {
                    choix[pos].textContent = choisi[i].textContent;
                    choix[pos].setAttribute('ok','1');
                    choisi[i].setAttribute('ok','0');
                    choisi[i].textContent = '';
                    nbrLettreSaisi--;
                }
            }
        }
    }
}
// l'ensemble des lettres choisi concatene au mot
function verifierMot()
{
    var lemot = "";
    for(let i=0; i<choisi.length; i++)
    {
        lemot += choisi[i].textContent;
    }
    if(lemot == mots[niveau])
    {
        nextlevel();
    }
    else{
        initialiseNiveau(niveau);
    }
}


nextlevel();

//document.getElementById('test').onclick = function()
//{
//    nextlevel();
//}