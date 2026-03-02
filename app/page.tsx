import Image from 'next/image';
import DataFlowBackground from '../components/DataFlowBackground';

export default function Home() {
  return (
    <>
      <DataFlowBackground />

      <div className="page">

        {/* Nav */}
        <nav>
          <div className="nav-brand">
            <Image src="/logo-SSIP.png" alt="SSIP" width={36} height={36} />
            <span>SSIP Hub</span>
          </div>
          <ul className="nav-links">
            <li><a href="#">Explore</a></li>
            <li><a href="#">Match</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="https://ssip-pl.ch">About SSIP</a></li>
          </ul>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-glass">
            <div className="hero-eyebrow">Swiss Space &amp; Innovation Platform</div>
            <h1>Accelerating <strong>Collaboration</strong><br />Across the Space Ecosystem</h1>
            <p className="hero-sub">
              SSIP is a matchmaking-driven innovation platform connecting space, defense,
              and deep-tech stakeholders — from Switzerland to the world.
            </p>
            <a href="https://ssip-pl.ch" className="btn-ghost">Connect the Ecosystem</a>
          </div>
        </section>

        {/* Our Cause */}
        <section className="section">
          <div className="section-eyebrow">Our Cause</div>
          <div className="content-block">
            <h2 className="block-title">A Network That Connects Networks</h2>
            <p className="block-body">
              The space ecosystem is complex, fragmented, and fast-moving. SSIP exists
              to connect the right people, technologies, and ideas at the right time.
            </p>
            <p className="block-body">
              Through structured matchmaking, curated programs, and cross-border initiatives,
              we enable meaningful collaboration across the entire value chain — from research
              and upstream technologies to downstream applications and commercialization.
            </p>
          </div>
        </section>

        {/* What We Enable */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">What We Enable</div>
          <div className="content-block">
            <h2 className="block-title">Matchmaking for Applied Space Innovation</h2>
            <p className="block-body">
              SSIP focuses on intentional, outcome-oriented connections, not random networking.
            </p>
            <ul className="enable-list">
              <li>Match organizations by capabilities, technology readiness, and strategic goals</li>
              <li>Connect startups with industrial partners, customers, and investors</li>
              <li>Link academia and research with real-world use cases</li>
              <li>Build cross-sector teams for space, defense, and dual-use innovation</li>
              <li>Enable European and international collaboration anchored in Switzerland</li>
            </ul>
          </div>
        </section>

        {/* Powerful Ways to Connect */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Powerful Ways to Connect</div>
          <div className="content-block">
            <h2 className="block-title">Designed for the Space Ecosystem</h2>
            <p className="block-body">
              SSIP activates matchmaking through multiple collaboration formats:
            </p>
            <div className="format-grid" style={{ marginTop: '28px' }}>
              <div className="format-card">
                <h4>Targeted Matchmaking</h4>
                <p>Curated introductions based on technology focus, mission needs, and innovation readiness.</p>
              </div>
              <div className="format-card">
                <h4>Collaborative Programs</h4>
                <p>Joint innovation programs that connect partners around shared challenges and opportunities.</p>
              </div>
              <div className="format-card">
                <h4>Workshops &amp; Hackathons</h4>
                <p>Hands-on formats that turn ideas into validated concepts, prototypes, and partnerships.</p>
              </div>
              <div className="format-card">
                <h4>Cross-Border Partnerships</h4>
                <p>We connect Swiss excellence with European and global space ecosystems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Use Cases */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Real-World Use Cases</div>
          <div className="use-case-grid">
            <div className="use-case-card">
              <div className="card-label sponsor">Industry &amp; SMEs</div>
              <p>Accelerate innovation by finding the right partners faster — from suppliers and technology providers to customers and integrators.</p>
              <p className="card-quote">&ldquo;SSIP connected us with partners we would never have reached through traditional channels.&rdquo;</p>
            </div>
            <div className="use-case-card">
              <div className="card-label researcher">Startups &amp; Scaleups</div>
              <p>Gain access to customers, pilots, funding opportunities, and industrial expertise.</p>
              <p className="card-quote">&ldquo;The matchmaking opened doors into the European space market.&rdquo;</p>
            </div>
            <div className="use-case-card">
              <div className="card-label institution">Academia &amp; Research</div>
              <p>Transform research into impact by connecting with industry challenges and applied programs.</p>
              <p className="card-quote">&ldquo;SSIP bridges the gap between research excellence and market needs.&rdquo;</p>
            </div>
            <div className="use-case-card">
              <div className="card-label public">Public Institutions &amp; Programs</div>
              <p>Enable mission-driven collaboration across defense, security, and space policy priorities.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">How It Works</div>
          <div className="section-title">From Connection to Collaboration</div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Understand the Need</h3>
              <p>We identify strategic goals, capabilities, and collaboration intent.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Match the Ecosystem</h3>
              <p>SSIP connects the most relevant partners across sectors and borders.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Activate Collaboration</h3>
              <p>Through programs, workshops, and facilitated formats.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <h3>Scale Impact</h3>
              <p>Successful collaborations evolve into long-term partnerships and innovation pipelines.</p>
            </div>
          </div>
        </section>

        {/* Why SSIP */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Why SSIP</div>
          <div className="section-title">Switzerland as a Gateway to Europe and Beyond</div>
          <div className="why-grid">
            <div className="why-item"><span className="why-dot" />Neutral, trusted platform for international collaboration</div>
            <div className="why-item"><span className="why-dot" />Deep integration into Swiss and European innovation ecosystems</div>
            <div className="why-item"><span className="why-dot" />Focus on applied innovation, not theory</div>
            <div className="why-item"><span className="why-dot" />Strong network across space, defense, and deep-tech</div>
            <div className="why-item"><span className="why-dot" />Collaboration over competition — always</div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Our Philosophy</div>
          <div className="content-block">
            <h2 className="block-title">We Collaborate, Not Compete</h2>
            <p className="block-body">
              SSIP does not replace existing initiatives — we connect them. We believe
              innovation happens when ecosystems align, trust is built, and collaboration
              is intentional.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-block">
            <div>
              <h2>Ready to Connect the Space Ecosystem?</h2>
              <p>
                Whether you are an industry leader, startup, researcher, or policymaker —
                SSIP is your gateway to meaningful collaboration in space and deep-tech.
                Let&rsquo;s build the future of space — together.
              </p>
            </div>
            <a href="https://ssip-pl.ch" className="btn-primary">Request Access</a>
          </div>
        </div>

        <div className="footer">
          SSIP &nbsp;&middot;&nbsp; Swiss Space &amp; Innovation Platform &nbsp;&middot;&nbsp; hub.ssip-pl.ch
        </div>

      </div>
    </>
  );
}
