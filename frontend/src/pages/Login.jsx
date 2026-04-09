import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const userEmail = email.toLowerCase();
      if (userEmail.includes('sylvia')) {
        navigate('/dashboard');
      } else if (userEmail.includes('sheep')) {
        navigate('/sheep');
      } else if (userEmail.includes('fish')) {
        navigate('/fish');
      } else if (userEmail.includes('vegetable')) {
        navigate('/vegetable');
      } else if (userEmail.includes('demonstration')) {
        navigate('/demonstration');
      } else {
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
          alt="Farm landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#22c55e]/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <Sprout className="w-20 h-20 mb-6" strokeWidth={1} />
          <h2 className="text-3xl font-light tracking-[0.3em] uppercase text-center">
            Redhill Farm
          </h2>
          <p className="mt-4 font-light tracking-widest text-sm opacity-80">
            Farm Management System
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-[#22c55e] font-light tracking-widest uppercase text-sm">
              Sylvia
            </span>
          </div>
          
          <h2 className="text-gray-800 text-sm font-light tracking-widest uppercase mb-1">
            Sign in
          </h2>
          <h1 className="text-gray-800 text-3xl font-light mb-10">
            Welcome!
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-500 text-sm mb-2">User</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                  placeholder="Enter your password"
                  defaultValue="password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-light tracking-wider py-3 rounded-lg transition-colors mt-4 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;