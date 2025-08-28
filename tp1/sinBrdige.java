abstract class Arma { abstract void atacar(); }

class EspadaFisica extends Arma {
    void atacar() { System.out.println("Espadazo fisico"); }
}

class EspadaMagica extends Arma {
    void atacar() { System.out.println("Espada encantada"); }
}
