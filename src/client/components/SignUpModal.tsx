
export default function SignUpModal() {


    return (
        <dialog className="modal"  id="signUpModal">
            <h1 className="text-center">Protract Sign Up</h1>
            <form className="flex flex-col border-0 border-purple-600" action="/signup" method="post">
                <fieldset className="border border-gray-400 rounded my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Username</legend>
                    <input type="text" name="username" className="focus:outline-none px-2 pb-2 bg-white" placeholder=""></input>
                </fieldset>
                <fieldset className="border border-gray-400 rounded my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Email</legend>
                    <input type="email" name="email" className="focus:outline-none px-2 pb-2 bg-white" placeholder=""></input>
                </fieldset>
                <fieldset className="border border-gray-400 rounded my-1 bg-white hover:border-gray-600 focus:border-red-600">
                    <legend className="text-xs ml-2 bg-transparent px-1">Password</legend>
                    <input type="password" name="password" className="focus:outline-none px-2 pb-2 bg-white"></input>
                </fieldset>
                <div className="flex flex-grow justify-between border-0 border-blue-600 my-2">
                    <button className="text-white bg-red-800 border-0 border-red-800 w-1/4 min-w-fit px-2 py-0 rounded" type="submit">Sign Up</button>
                    <button className="text-red-800 bg-white border-2 border-white w-1/4 min-w-fit p-2 rounded" type="button" onClick={() => (document.querySelector("#signUpModal") as HTMLDialogElement).close()}>Cancel</button>
                </div>
            </form>
        </dialog>
    )
}