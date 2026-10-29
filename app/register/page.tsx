export default function Register(){
    return(
        <section data-screen="register" className="bg-base-200 grid place-items-center px-4 py-10">
            <div className="card bg-base-100 w-full max-w-sm shadow-md">
            <form className="card-body" data-form="register" noValidate>
                <h2 className="card-title text-2xl justify-center">Crea tu cuenta</h2>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Nombre</legend>
                <input type="text" className="input w-full" placeholder="Ana Pérez"/>
                <legend className="fieldset-legend">Correo</legend>
                <input type="email" className="input w-full" placeholder="tu@correo.com"/>
                <legend className="fieldset-legend">Contraseña</legend>
                <input type="password" className="input w-full" placeholder="********"/>
                <legend className="fieldset-legend">Confirmar contraseña</legend>
                <input type="password" className="input w-full input-error" data-confirm placeholder="********"/>
                <p className="label text-error" data-error>Las contraseñas no coinciden.</p>
                </fieldset>
                <button className="btn btn-primary w-full mt-2">Crear cuenta</button>
                <p className="text-center text-sm mt-2">"¿Ya tienes cuenta? "
                    <a className="link link-primary" data-go="login">Inicia sesión</a>
                </p>
            </form>
            </div>
        </section>
    )
}