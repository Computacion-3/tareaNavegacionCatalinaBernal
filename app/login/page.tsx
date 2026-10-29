export default function Login(){
    return(

    <section data-screen="login" className="bg-base-200 grid place-items-center px-4 py-10">
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="card bg-base-100 w-full max-w-sm shadow-sm">
            <form className="card-body" data-form="login" noValidate>
                <h2 className="card-title text-2xl justify-center">GymRoutines</h2>
                <p className="text-center text-base-content-70 text-sm">Inicia sesión para ver tus rutinas</p>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Correo</legend>
                <input type="email" className="input w-full input-error" placeholder="tu@correo.com" required/>
                <legend className="fieldset-legend">Constraseña</legend>
                <input type="password" className="input w-full input-error" placeholder="********" required/>
                <p className="label text-error" data-error>Completa el correo y la contraseña.</p>
                </fieldset>
                <div className="card-actions justify-end">
                <button className="btn btn-primary w-full mt-2">Iniciar Sesión</button>
                </div>
                <p className="text-center text-sm mt-2">"¿No tienes cuenta? "
                    <a className="link link-primary" data-go="register">Regístrate</a>
                </p>
            </form>
            </div>
        </main>
    </section>
    )
}