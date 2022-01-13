db = connect( 'mongodb://localhost/CIReserve' );

//================================================================================
//================================================================================
db.Reservations.insertMany(
[{
  "_id": {
    "$oid": "61dd93ff3b4e68067486d38b"
  },
  "begin": {
    "$date": "2022-01-11T08:00:00Z"
  },
  "end": {
    "$date": "2022-01-11T10:00:00Z"
  },
  "duration": 2,
  "user": "61dd90b23b4e68067486d38a",
  "reason": "project",
  "building": 2,
  "floor": 108
},{
  "_id": {
    "$oid": "61ddf4da25b0723f2661372f"
  },
  "begin": {
    "$date": "2022-01-13T08:30:00Z"
  },
  "end": {
    "$date": "2022-01-13T11:30:00Z"
  },
  "duration": 3,
  "user": "61dd90b23b4e68067486d38a",
  "reason": "project",
  "building": 3,
  "floor": 956
},{
  "_id": {
    "$oid": "61ddf56025b0723f26613730"
  },
  "begin": {
    "$date": "2022-01-14T08:30:00Z"
  },
  "end": {
    "$date": "2022-01-14T17:30:00Z"
  },
  "duration": 9,
  "user": "61dd90b23b4e68067486d38a",
  "reason": "project",
  "building": 3,
  "floor": 956
}]
)

//================================================================================
//================================================================================
db.Rooms.insertMany(
[{
  "_id": {
    "$oid": "61de020625b0723f26613733"
  },
  "floor": 108,
  "building": "B",
  "nbPerson": 64,
  "hasProj": false,
  "nbPlug": 15,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "MI",
  "roomSize_m2": 215,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de033225b0723f26613738"
  },
  "floor": 109,
  "building": "B",
  "nbPerson": 5,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "",
  "roomSize_m2": 12,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de072b25b0723f2661373b"
  },
  "floor": 104,
  "building": "B",
  "nbPerson": 5,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "club etudiant",
  "roomSize_m2": 12,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de075825b0723f2661373c"
  },
  "floor": 105,
  "building": "B",
  "nbPerson": 5,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "club etudiant",
  "roomSize_m2": 12,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de076525b0723f2661373d"
  },
  "floor": 106,
  "building": "B",
  "nbPerson": 5,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "club etudiant",
  "roomSize_m2": 11,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de079125b0723f2661373e"
  },
  "floor": 103,
  "building": "B",
  "nbPerson": 12,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "RCV studio",
  "roomSize_m2": 32,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de081825b0723f2661373f"
  },
  "floor": 107,
  "building": "B",
  "nbPerson": 14,
  "hasProj": false,
  "nbPlug": 10,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "RCV bureau",
  "roomSize_m2": 36,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de087925b0723f26613740"
  },
  "floor": 102,
  "building": "B",
  "nbPerson": 12,
  "hasProj": false,
  "nbPlug": 15,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "CEA",
  "roomSize_m2": 32,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de08aa25b0723f26613741"
  },
  "floor": 101,
  "building": "B",
  "nbPerson": 10,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "Local archives",
  "roomSize_m2": 25,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de09dd25b0723f26613742"
  },
  "floor": 101,
  "building": "A",
  "nbPerson": 6,
  "hasProj": false,
  "nbPlug": 4,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "Depo Inf",
  "roomSize_m2": 16,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de09ff25b0723f26613743"
  },
  "floor": 102,
  "building": "A",
  "nbPerson": 4,
  "hasProj": false,
  "nbPlug": 5,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "club etudiant",
  "roomSize_m2": 10,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0a3125b0723f26613744"
  },
  "floor": 103,
  "building": "A",
  "nbPerson": 8,
  "hasProj": false,
  "nbPlug": 8,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "labo PHYS",
  "roomSize_m2": 20,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0aa925b0723f26613745"
  },
  "floor": 104,
  "building": "A",
  "nbPerson": 12,
  "hasProj": true,
  "nbPlug": 12,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "salle d info",
  "roomSize_m2": 31,
  "isBookable": true
},{
  "_id": {
    "$oid": "61de0b3425b0723f26613746"
  },
  "floor": 105,
  "building": "A",
  "nbPerson": 2,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "SAS",
  "roomSize_m2": 7,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0b6e25b0723f26613747"
  },
  "floor": 106,
  "building": "A",
  "nbPerson": 40,
  "hasProj": true,
  "nbPlug": 20,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "TP info",
  "roomSize_m2": 73,
  "isBookable": true
},{
  "_id": {
    "$oid": "61de0b9525b0723f26613748"
  },
  "floor": 107,
  "building": "A",
  "nbPerson": 4,
  "hasProj": false,
  "nbPlug": 2,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "depot info",
  "roomSize_m2": 11,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0bc125b0723f26613749"
  },
  "floor": 108,
  "building": "A",
  "nbPerson": 8,
  "hasProj": false,
  "nbPlug": 15,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "servers info",
  "roomSize_m2": 23,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0c5c25b0723f2661374a"
  },
  "floor": 109,
  "building": "A",
  "nbPerson": 10,
  "hasProj": false,
  "nbPlug": 10,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "MICROSCOPE CHP PR 1/2",
  "roomSize_m2": 29,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0c6a25b0723f2661374b"
  },
  "floor": 110,
  "building": "A",
  "nbPerson": 10,
  "hasProj": false,
  "nbPlug": 10,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "MICROSCOPE CHP PR 2/2",
  "roomSize_m2": 29,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0c9825b0723f2661374c"
  },
  "floor": 111,
  "building": "A",
  "nbPerson": 32,
  "hasProj": true,
  "nbPlug": 15,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "salle de cours",
  "roomSize_m2": 48,
  "isBookable": true
},{
  "_id": {
    "$oid": "61de0cf525b0723f2661374d"
  },
  "floor": 112,
  "building": "A",
  "nbPerson": 5,
  "hasProj": false,
  "nbPlug": 5,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "",
  "roomSize_m2": 12,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0d8f25b0723f2661374e"
  },
  "floor": 113,
  "building": "A",
  "nbPerson": 2,
  "hasProj": false,
  "nbPlug": 10,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "TGBT",
  "roomSize_m2": 7,
  "isBookable": false
},{
  "_id": {
    "$oid": "61de0dbc25b0723f2661374f"
  },
  "floor": 114,
  "building": "A",
  "nbPerson": 10,
  "hasProj": false,
  "nbPlug": 5,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "depot divers",
  "roomSize_m2": 30,
  "isBookable": false
},{
  "_id": {
    "$oid": "61dee516609312af4e83425c"
  },
  "floor": 304,
  "building": "C",
  "nbPerson": 150,
  "hasProj": true,
  "nbPlug": 24,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "JND",
  "roomSize_m2": 151.16,
  "isBookable": true
},{
  "_id": {
    "$oid": "61dee761609312af4e83425d"
  },
  "floor": 305,
  "building": "C",
  "nbPerson": 20,
  "hasProj": false,
  "nbPlug": 10,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "Locaux divers atelier de maintenance générale",
  "roomSize_m2": 47.71,
  "isBookable": false
},{
  "_id": {
    "$oid": "61dee818609312af4e83425e"
  },
  "floor": 306,
  "building": "C",
  "nbPerson": 10,
  "hasProj": false,
  "nbPlug": 5,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "Locaux divers bureau maintenance",
  "roomSize_m2": 28.87,
  "isBookable": false
},{
  "_id": {
    "$oid": "61dee876609312af4e83425f"
  },
  "floor": 307,
  "building": "C",
  "nbPerson": 25,
  "hasProj": false,
  "nbPlug": 15,
  "planning": [],
  "imgPos": [],
  "hasPlug": true,
  "other": "Locaux divers atelier de mécanique",
  "roomSize_m2": 79.24,
  "isBookable": false
}]
)

//================================================================================
//================================================================================
db.Users.insertMany(
[{
  "_id": {
    "$oid": "61dd90b23b4e68067486d38a"
  },
  "userName": "Noé",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$kKqrk9YM2Q2pclhZ4RYZQOKe4GZZaxMyCOzX9DpdgOzNKyC/FjYDO",
  "email": "noe.klopocki@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf2c825b0723f26613726"
  },
  "userName": "Spac3Drunk",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$hNlHIUIs3emuRdFOUxjhg.ugVXFvfm5Tw7hNUlHDBJ0GUX3YcEk.S",
  "email": "louis.manouvriez@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf2e225b0723f26613727"
  },
  "userName": "Alexi",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$GkimzyJ3sCrH4T8RBDsdKuQ/9N.YMZXn0g5XJ2IbnvzRh.uKoDgWe",
  "email": "alexis.chevet@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf30c25b0723f26613728"
  },
  "userName": "TT_",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$zXFUnGUgjfHnYEDBIHmD6uxspOZ9m0PQcenQKHCDl2f.RL76qyMn6",
  "email": "theodore.martin@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf32625b0723f26613729"
  },
  "userName": "NicoluGB99",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$u18KRkgQWYVWneED4k7dO.HAnUtWZpkDfNyP6f9cmCabfARXIuZnu",
  "email": "nicolas.urquijo@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf34825b0723f2661372a"
  },
  "userName": "Pauli",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$tESa00VyTNuarAmVl32yWe6pWWyFzbszGb.W8c1l1jws5k8EAP5gO",
  "email": "pauline.jaspart@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf36525b0723f2661372b"
  },
  "userName": "Léo",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$kKqrk9YM2Q2pclhZ4RYZQOKe4GZZaxMyCOzX9DpdgOzNKyC/FjYDO",
  "email": "leo.pawlicki@student.junia.com"
},{
  "_id": {
    "$oid": "61ddf37425b0723f2661372c"
  },
  "userName": "Hugros",
  "isAdmin": true,
  "classe": 4,
  "hash": "$2b$12$VvHqyuc/TT4TqC9NnUYRRuOJYMf2LF/wfWj7fPaxD3l.QqUTm3Oqi",
  "email": "hugo.martel@student.junia.com"
}]
)
