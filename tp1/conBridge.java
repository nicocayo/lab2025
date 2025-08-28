interface TipoDanio { void aplicarDanio(); }

class DanioFisico implements TipoDanio {
    public void aplicarDanio() { System.out.println("Dano fisico"); }
}

class DanioMagico implements TipoDanio {
    public void aplicarDanio() { System.out.println("Dano magico"); }
}

abstract class Arma {
    protected TipoDanio tipoDanio;
    public Arma(TipoDanio tipoDanio) { this.tipoDanio = tipoDanio; }
    abstract void atacar();
}

class Espada extends Arma {
    public Espada(TipoDanio tipoDanio) { super(tipoDanio); }
    void atacar() { System.out.print("Espada ataca con "); tipoDanio.aplicarDanio(); }
}

class Baculo extends Arma {
    public Baculo(TipoDanio tipoDanio) { super(tipoDanio); }
    void atacar() { System.out.print("Baculo ataca con "); tipoDanio.aplicarDanio(); }
}

