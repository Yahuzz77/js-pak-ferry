function Pemain(nama,energi){
    let pemain = {};
    pemain.nama = nama;
    pemain.energi = energi;

    pemain.makan = function(porsi){
        this.energi += porsi;
        console.log(`Halo ${this.nama}, selamat makan!`);
    }

    pemain.damage = function(hit){
        this.energi -= hit;
        console.log(`Halo ${this.nama}, kamu telah menerima damage sebesar ${hit}. Energi tersisa: ${this.energi}`);
    }

    return pemain;
}

let pemain1 = Pemain('Ucup', 10);
let pemain2 = Pemain('Otong', 20);

console.log(pemain1);
console.log(pemain2);

pemain1.makan(5);
console.log("Energi " + pemain1.nama + " sekarang adalah " + pemain1.energi);
pemain2.damage(10);
console.log("Energi " + pemain2.nama + " sekarang adalah " + pemain2.energi);
