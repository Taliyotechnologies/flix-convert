import React from 'react';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <Link to="/">FlixConvert</Link>
          
          <h2>Create Account</h2>
          <p>Join thousands of users who trust FlixConvert</p>
        </div>

        <div>
          <form>
            <div>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a strong password" />
              <p>Must be at least 8 characters long</p>
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
            </div>

            <div>
              <input type="checkbox" id="agree-terms" name="agree-terms" required />
              <label htmlFor="agree-terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button type="submit">Create Account</button>
            </div>

            <div>
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
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

        <div>
          <div>
            <p>Fast Processing</p>
          </div>
          <div>
            <p>Secure & Private</p>
          </div>
          <div>
            <p>Free to Use</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 