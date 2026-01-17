// Inicializamos los datos si es la primera vez que entramos
if (!localStorage.getItem('wallet_saldo')) {
    localStorage.setItem('wallet_saldo', '500000');
    localStorage.setItem('wallet_movimientos', JSON.stringify([
        { fecha: '10/01/2026', tipo: 'Ingreso', desc: 'Saldo Inicial', monto: 500000 }
    ]));
}

// Función para obtener saldo
function getSaldo() {
    return parseInt(localStorage.getItem('wallet_saldo'));
}

// Función para guardar una nueva transacción
function registrarMovimiento(tipo, desc, monto) {
    let saldo = getSaldo();
    
    // Si es egreso, restamos; si es ingreso, sumamos
    if (tipo === 'Egreso') {
        saldo -= monto;
    } else {
        saldo += monto;
    }
    
    // Guardamos nuevo saldo
    localStorage.setItem('wallet_saldo', saldo.toString());
    
    // Guardamos en el historial
    let movimientos = JSON.parse(localStorage.getItem('wallet_movimientos'));
    movimientos.unshift({
        fecha: new Date().toLocaleDateString(),
        tipo: tipo,
        desc: desc,
        monto: monto
    });
    localStorage.setItem('wallet_movimientos', JSON.stringify(movimientos));
}