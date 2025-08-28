import java.util.concurrent.*;

public class MonitoreoSiu {
    public static void main(String[] args) throws InterruptedException {
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        
        Runnable tareaVerificacion = new Runnable() {
            @Override
            public void run() {
                System.out.println("Verificando Estado del SIU ...");
                
                // Simulamos la verificación (en la realidad sería una request HTTP)
                boolean sitioActivo = Math.random() > 0.8; // 20% probabilidad de estar activo
                
                if (sitioActivo) {
                    System.out.println("SIU NO se cayó... por ahora ");
                } else {
                    System.out.println("SIU se cayó... otra vez " );
                }
            }
        };
        
        ScheduledFuture<?> futuro = scheduler.scheduleWithFixedDelay(tareaVerificacion, 0, 5, TimeUnit.SECONDS);
        
        Thread.sleep(20000);

        futuro.cancel(true);        
        scheduler.shutdown();
        
        System.out.println("Monitoreo finalizado");
    }
}