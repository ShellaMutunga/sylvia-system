import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sylvia@redhill.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await authService.login(email, password);
      
      // Route based on email for profile pages
      const emailLower = email.toLowerCase();
      if (emailLower.includes('sheep')) {
        navigate('/sheep');
      } else if (emailLower.includes('fish')) {
        navigate('/fish');
      } else if (emailLower.includes('vegetable')) {
        navigate('/vegetable');
      } else if (emailLower.includes('demonstration')) {
        navigate('/demonstration');
      } else {
        // Route based on role for admin users
        const role = user?.roles?.[0]?.name;
        if (role === 'admin' || role === 'manager') {
          navigate('/dashboard');
        } else if (role === 'vet') {
          navigate('/animals');
        } else if (role === 'accountant') {
          navigate('/finance');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || 'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
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

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-500 text-sm mb-2">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-light tracking-wider py-3 rounded-lg transition-colors mt-4 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
