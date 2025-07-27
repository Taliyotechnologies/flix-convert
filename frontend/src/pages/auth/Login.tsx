import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <Link to="/">FlixConvert</Link>
          
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <div>
          <form>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" />
            </div>

            <div>
              <div>
                <input type="checkbox" id="remember-me" name="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <div>
                <a href="#">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button type="submit">Sign In</button>
            </div>

            <div>
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </form>

          <div>
            <div>
              <div></div>
              <div>
                <span>Or continue with</span>
              </div>
            </div>

            <div>
              <button type="button">Google</button>
              <button type="button">GitHub</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 