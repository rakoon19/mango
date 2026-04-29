import Link from "next/link";

const Register = () => {
    return (
<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend font-bold text-3xl text-center">Register</legend>

    <label className="label">Name</label>
    <input type="text" className="input" placeholder="Name" />
    
  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <button className="btn btn-neutral mt-4">Register</button>

  <p>Already have an account? <Link href="/login" className="link link-secondary">Login</Link></p>
</fieldset>
    );
};

export default Register;