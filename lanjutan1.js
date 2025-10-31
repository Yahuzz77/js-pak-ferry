// Inventory sederhana untuk menyimpan senjata (weapons) dan makanan (foods)
function Inventory(){
    const inv = {};
    inv._nextId = 1;
    inv.weapons = []; // { id, name, damage, qty }
    inv.foods = [];   // { id, name, heal, qty }

    inv._id = function(){ return inv._nextId++; }

    inv.addWeapon = function(name, damage, qty){
        inv.weapons.push({ id: inv._id(), name, damage: Number(damage)||0, qty: qty === undefined ? Infinity : Number(qty) });
        return inv;
    }
    inv.addFood = function(name, heal, qty){
        inv.foods.push({ id: inv._id(), name, heal: Number(heal)||0, qty: qty === undefined ? Infinity : Number(qty) });
        return inv;
    }
    inv.getWeapons = function(){ return inv.weapons.slice(); }
    inv.getFoods = function(){ return inv.foods.slice(); }

    inv.useWeapon = function(id){
        const item = inv.weapons.find(w => String(w.id) === String(id));
        if(!item) return 0;
        if(item.qty === Infinity || item.qty > 0){
            if(item.qty !== Infinity){ item.qty -= 1; }
            return item.damage;
        }
        return 0;
    }
    inv.consumeFood = function(id){
        const item = inv.foods.find(f => String(f.id) === String(id));
        if(!item) return 0;
        if(item.qty === Infinity || item.qty > 0){
            if(item.qty !== Infinity){ item.qty -= 1; }
            return item.heal;
        }
        return 0;
    }
    inv.clear = function(){ inv.weapons = []; inv.foods = []; return inv; }
    return inv;
}

// Pengisi inventori default bertema boxing
function isiInventoriAwal(pemain){
    if(!pemain || !pemain.inventory) return;
    pemain.inventory.clear()
        // Senjata (damage)
        .addWeapon('Jab', 3, Infinity)
        .addWeapon('Cross', 5, Infinity)
        .addWeapon('Uppercut', 8, 10)
        .addWeapon('Haymaker', 12, 5)
        // Makanan (heal)
        .addFood('Energy Bar', 5, Infinity)
        .addFood('Protein Shake', 8, 10)
        .addFood('Isotonic Gel', 12, 5);
}

function Pemain(nama,energi){
    let pemain = {};
    pemain.nama = nama;
    pemain.energi = energi;
    pemain.inventory = Inventory();

    pemain.makan = function(porsi){
        this.energi += porsi;
        console.log(`Halo ${this.nama}, selamat makan! (+${porsi})`);
    }

    pemain.damage = function(hit){
        this.energi -= hit;
        console.log(`Halo ${this.nama}, kamu telah menerima damage sebesar ${hit}. Energi tersisa: ${this.energi}`);
    }

    return pemain;
}

let pemain1 = Pemain('Ucup', 10);
let pemain2 = Pemain('Otong', 20);

// Isi inventori awal untuk kedua pemain
isiInventoriAwal(pemain1);
isiInventoriAwal(pemain2);

// Log ringan (bisa dihapus jika tidak diperlukan)
console.log({ pemain1, pemain2 });
