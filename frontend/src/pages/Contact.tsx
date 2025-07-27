import React from 'react';

const Contact: React.FC = () => {
  return (
    <div>
      <section>
        <div>
          <h1>Get in Touch</h1>
          <p>Have questions or need support? We're here to help you with all your file conversion needs.</p>
        </div>
      </section>

      <section>
        <div>
          <div>
            <div>
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels. We typically respond within 24 hours.</p>
            </div>

            <div>
              <div>
                <h3>Email</h3>
                <p>info@flixconvert.com</p>
                <p>support@flixconvert.com</p>
              </div>

              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri: 9AM-6PM EST</p>
              </div>

              <div>
                <h3>Address</h3>
                <p>123 Tech Street<br />
                Digital City, DC 12345<br />
                United States</p>
              </div>

              <div>
                <h3>Social Media</h3>
                <div>
                  <a href="#">Twitter</a>
                  <a href="#">LinkedIn</a>
                  <a href="#">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2>Send us a Message</h2>
            
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
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="business">Business Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} placeholder="Tell us how we can help you..."></textarea>
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div>
          <div>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our services</p>
          </div>

          <div>
            <div>
              <h3>What file formats do you support?</h3>
              <p>We support over 200 file formats including images (JPG, PNG, GIF, WebP), videos (MP4, AVI, MOV, MKV), audio (MP3, WAV, FLAC, AAC), and documents (PDF, DOC, DOCX, TXT).</p>
            </div>

            <div>
              <h3>Is my data secure?</h3>
              <p>Yes, we take security seriously. All files are encrypted during transfer and processing. Files are automatically deleted from our servers after 24 hours.</p>
            </div>

            <div>
              <h3>How fast is the conversion process?</h3>
              <p>Most conversions are completed within seconds. Larger files may take a few minutes. You'll receive an email notification when your conversion is ready.</p>
            </div>

            <div>
              <h3>Do you offer batch processing?</h3>
              <p>Yes, our batch processing feature allows you to convert multiple files at once. Simply select multiple files and choose your desired output format.</p>
            </div>

            <div>
              <h3>Is there a file size limit?</h3>
              <p>Free users can upload files up to 10MB. Premium users can upload files up to 100MB. For larger files, please contact our support team.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 