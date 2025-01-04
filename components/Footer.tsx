"use client";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Copyright */}
      <div className="footer-text text-center">
        <p>
          &copy; 2024 All Rights Reserved. Designed by{" "}
          <strong>Huu Hung Nguyen</strong>
        </p>
      </div>

      {/* Angular Repo Star Section */}
      <div className="github-repo">
        <p>
          Love it?&nbsp;
          <a
              href="https://github.com/hhnguyen-20/us-citizenship-test"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
          >
            Give my repo a star.
            {/* changed from <div> to <span> */}
            <span className="github-star-badge">
              <svg
                  className="material-icons"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03
                         L22 9.24l-7.19-.61L12 2
                         9.19 8.63 2 9.24l5.46 4.73
                         L5.82 21z"/>
              </svg>
              Star
            </span>
          </a>
        </p>
      </div>
    </footer>
  );
}
