"use client"
import { motion } from "framer-motion"
import {
  HandshakeIcon,
  TrendingUpIcon,
  DollarSignIcon,
  InfinityIcon,
  GiftIcon,
  CheckCircleIcon,
  HeadphonesIcon,
  BarChartIcon,
  ArrowRightIcon,
  CoinsIcon,
  UsersIcon,
  CalendarIcon,
  HelpCircleIcon,
  CheckIcon,
  ShieldIcon,
  GlobeIcon,
  ZapIcon,
  AwardIcon,
} from "lucide-react"
import {Link} from "react-router-dom";
import { ServiceSEO } from "../../../SEO";


const SeoReferralProgram = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="bg-[var(--card-background)] text-white min-h-screen font-sans">
      <ServiceSEO service="seoReferral" />
      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 flex flex-col items-center justify-center overflow-hidden">

        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="flex items-center justify-center mb-4">
            <HandshakeIcon className="w-12 h-12 text-white mr-3" />
            <TrendingUpIcon className="w-12 h-12 text-blue-200" />
          </div>

          <h1 className="text-5xl font-extrabold bg-white bg-clip-text text-transparent drop-shadow-lg">
            SEO Referral Program
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto text-[var(--text-primary)] font-bold leading-relaxed">
            Partner with Go Digital Africa and earn substantial rewards by referring businesses to our premium SEO
            services. Help African companies grow their digital presence while building a passive income stream.
          </p>

          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-lg font-semibold hover:from-cyan-700 hover:to-blue-800 transition duration-300 shadow-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("This feature is not available yet")}
          >
            Join the Program
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </motion.button>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-bold">
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
              <span>No signup fees</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
              <span>Earn up to 15% commission</span>
            </div>
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-400 mr-2" />
              <span>Monthly payouts</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--background-light)]"></div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center bg-clip-text bg-gradient-to-r from-[var(--logo-bg)] to-blue-600 text-transparent mb-4">
            Why Join Our SEO Referral Program?
          </h2>

          <p className="text-center text-[var(--text-secondary)] max-w-3xl mx-auto mb-16">
            Our program is designed specifically for the African market, offering competitive rewards and comprehensive
            support to help you succeed.
          </p>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger}>
            {[
              {
                icon: <DollarSignIcon className="w-10 h-10 text-white" />,
                title: "Lucrative Commissions",
                desc: "Earn up to 20% commission on every successful referral's SEO package for up to 12 months.",
              },
              {
                icon: <InfinityIcon className="w-10 h-10 text-white" />,
                title: "Unlimited Earning Potential",
                desc: "No cap on referrals or earnings – the more businesses you refer, the more you earn.",
              },
              {
                icon: <GiftIcon className="w-10 h-10 text-white" />,
                title: "Exclusive Bonuses",
                desc: "Unlock special rewards, discounts on our services, and bonus commissions as you reach milestones.",
              },
              {
                icon: <CheckCircleIcon className="w-10 h-10 text-white" />,
                title: "Proven SEO Results",
                desc: "Refer with confidence knowing we deliver measurable results for businesses across Africa.",
              },
              {
                icon: <HeadphonesIcon className="w-10 h-10 text-white" />,
                title: "Dedicated Partner Support",
                desc: "Get personalized assistance, marketing materials, and guidance to maximize your referrals.",
              },
              {
                icon: <BarChartIcon className="w-10 h-10 text-white" />,
                title: "Real-Time Tracking",
                desc: "Monitor your referrals, conversions, and earnings through our intuitive partner dashboard.",
              },
              {
                icon: <GlobeIcon className="w-10 h-10 text-white" />,
                title: "African Market Focus",
                desc: "Benefit from our specialized knowledge of SEO requirements across different African markets.",
              },
              {
                icon: <ShieldIcon className="w-10 h-10 text-white" />,
                title: "Secure & Reliable Payments",
                desc: "Receive your commissions on time through multiple payment methods available across Africa.",
              },
              {
                icon: <ZapIcon className="w-10 h-10 text-white" />,
                title: "Quick Approval Process",
                desc: "Get started fast with our streamlined application and approval system.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#0F3460] backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[var(--light-bg)]/80">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center bg-white bg-clip-text text-transparent mb-4">
            How Our Referral Program Works
          </h2>

          <p className="text-center text-gray-800 font-bold max-w-3xl mx-auto mb-16">
            A simple four-step process to start earning commissions with Go Digital Africa
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <UsersIcon className="w-12 h-12 text-white" />,
                title: "Sign Up",
                desc: "Complete our simple application form to join the program. Approval typically takes 24-48 hours.",
              },
              {
                icon: <HandshakeIcon className="w-12 h-12 text-white" />,
                title: "Refer Businesses",
                desc: "Share your unique referral link or use our marketing materials to recommend our SEO services.",
              },
              {
                icon: <CheckCircleIcon className="w-12 h-12 text-white" />,
                title: "Client Conversion",
                desc: "We'll handle the sales process when your referral contacts us through your unique link.",
              },
              {
                icon: <CoinsIcon className="w-12 h-12 text-white" />,
                title: "Earn Commissions",
                desc: "Receive your commission when the referred client pays for our services. Track everything in your dashboard.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative bg-slate-700 backdrop-blur-sm p-8 rounded-xl border border-gray-700 text-center"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-white to-blue-700 flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-100 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Commission Structure */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--background-light)]"></div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-cyan-800 bg-clip-text text-transparent mb-4">
            Commission Structure
          </h2>

          <p className="text-center text-gray-900 max-w-3xl mx-auto mb-16">
            Our tiered commission structure rewards your growth as a referral partner
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <AwardIcon className="w-12 h-12 text-blue-400" />,
                title: "Standard Partner",
                commission: "4.5%",
                duration: "First 3 months",
                requirement: "0-4 referrals",
                color: "from-blue-600 to-blue-400",
                colorStart: "blue-600",
                colorEnd: "blue-400"
              },
              {
                icon: <AwardIcon className="w-12 h-12 text-silver-400" />,
                title: "Silver Partner",
                commission: "6.5%",
                duration: "First 6 months",
                requirement: "5-9 referrals",
                color: "from-gray-400 to-gray-300",
                colorStart: "gray-400",
                colorEnd: "gray-300",
                featured: true,
              },
              {
                icon: <AwardIcon className="w-12 h-12 text-white" />,
                title: "Gold Partner",
                commission: "8.5%",
                duration: "First 12 months",
                requirement: "10+ referrals",
                color: "from-yellow-600 to-yellow-400",
                colorStart: "yellow-600",
                colorEnd: "yellow-400"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border ${item.featured ? "border-blue-500 shadow-lg shadow-cyan-500" : "border-gray-700"} relative`}
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                {item.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white text-sm font-bold py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-center text-cyan-400 mb-3">{item.title}</h3>

                <div className="text-center mb-6">
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r from-${item.colorStart} to-${item.colorEnd} bg-clip-text text-transparent mb-1`}
                  >
                    {item.commission}
                  </div>
                  <div className="text-gray-400">Commission Rate</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-purple-400 mr-3" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="w-5 h-5 text-purple-400 mr-3" />
                    <span>{item.requirement}</span>
                  </div>
                </div>

                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    style={{ width: index === 0 ? "33%" : index === 1 ? "66%" : "100%" }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-3">Additional Bonuses</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <span>Performance bonus of 4.5% for any referral that signs up for a 12-month contract</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <span>Loyalty bonus of 10,000 after your first year in the program, with over 10 referrals</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                <span>Special incentives during promotional periods (announced quarterly)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="w-full max-w-[1600px] mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  SEO Referral Program
                </h2>
                <p className="text-xl text-white max-w-3xl mx-auto font-bold">
                  Earn rewards by referring businesses to our SEO services
                </p>
              </motion.div>
      
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20"
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">How It Works</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Refer a Business</h4>
                        <p className="text-gray-300">Share your unique referral code with businesses that could benefit from our SEO services.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">They Sign Up</h4>
                        <p className="text-gray-300">When they sign up for any of our SEO packages using your code, we'll track the referral.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Earn Rewards</h4>
                        <p className="text-gray-300">You'll receive a commission based on the package they choose, paid directly to you each month.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-700 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20"
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">Referral Rewards</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                      <span className="text-white font-medium">Basic Package</span>
                      <span className="text-lg font-bold text-blue-400">Ksh 10,000</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                      <span className="text-white font-medium">Standard Package</span>
                      <span className="text-lg font-bold text-blue-400">Ksh 15,000</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                      <span className="text-white font-medium">Premium Package</span>
                      <span className="text-lg font-bold text-blue-400">Ksh 20,000</span>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4">
                      <span className="text-white font-medium">Enterprise Solutions</span>
                      <span className="text-lg font-bold text-blue-400">12% Commission</span>
                    </div>
                  </div>
                  
                  <Link onClick={() => alert("This feature is not available yet")}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-gradient-to-r from-[var(--logo-bg)] to-blue-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Join Referral Program
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-700 p-6 rounded-xl mt-10 max-w-3xl mx-auto text-center"
              >
                <h4 className="text-xl font-semibold text-white mb-2">Already part of our referral program?</h4>
                <p className="text-gray-300 mb-4">Track your referrals and commissions by logging into your referral dashboard.</p>
                <Link onClick={() => alert("This feature is not available yet")}>
                  <button className="px-8 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-medium rounded-full transition-all duration-300">
                    Referral Login
                  </button>
                </Link>
              </motion.div>
            </div>
          </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-[var(--background-light)]">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-800 to-cyan-800 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-center text-gray-100 font-bold max-w-3xl mx-auto mb-16">
            Everything you need to know about our SEO referral program
          </p>

          <div className="space-y-6">
            {[
              {
                question: "Who can join the referral program?",
                answer:
                  "Our program is open to digital marketing professionals, business consultants, web developers, and entrepreneurs across Africa. We particularly welcome partners with networks in Kenya, Nigeria, South Africa, Ghana, and other growing digital markets.",
              },
              {
                question: "How and when do I get paid?",
                answer:
                  "Commissions are paid monthly, typically within 15 days after the referred client's payment clears. We offer multiple payment methods including bank transfers, mobile money services (like M-Pesa), and PayPal to accommodate partners across different African regions.",
              },
              {
                question: "Is there a minimum payout threshold?",
                answer:
                  "Yes, the minimum payout threshold is $50 USD (or equivalent in local currency). Any earnings below this amount will roll over to the next payment cycle.",
              },
              {
                question: "How long do I earn commissions for each referral?",
                answer:
                  "Commission duration depends on your partner tier: Standard Partners earn for 3 months, Silver Partners for 6 months, and Gold Partners for 12 months from the start of each client's contract.",
              },
              {
                question: "What marketing materials do you provide?",
                answer:
                  "We provide a comprehensive set of marketing materials including email templates, social media posts, banner ads, presentation slides, and case studies. All materials are available in English, French, Swahili, and Arabic to support different African markets.",
              },
              {
                question: "Can I refer businesses outside of Africa?",
                answer:
                  "Yes, while our expertise is centered on African markets, we accept clients from around the world. However, our marketing materials and case studies are primarily focused on African business contexts.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-slate-800 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                variants={fadeIn}
              >
                <div className="flex items-start">
                  <HelpCircleIcon className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.question}</h3>
                    <p className="text-gray-100 font-medium">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-[var(--card-background)]"></div>

        <motion.div
          className="relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-800 to-blue-800 bg-clip-text text-transparent drop-shadow-lg mb-4">
            Start Earning With Go Digital Africa Today
          </h2>

          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-900 leading-relaxed mb-8">
            Join our network of successful partners across Africa and turn your connections into a reliable income
            stream. Our dedicated partner support team is ready to help you succeed.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-slate-500 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-blue-300">Active Partners</div>
            </div>
            <div className="bg-slate-500 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-white">$50K+</div>
              <div className="text-sm text-blue-300">Commissions Paid</div>
            </div>
            <div className="bg-slate-500 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-sm text-blue-300">African Countries</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-cyan-800 text-white rounded-full text-lg font-bold hover:from-gray-800 hover:to-blue-800 transition duration-300 shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("This feature is not available yet")}
            >
              Join Now
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-white rounded-full text-lg font-bold hover:bg-gray-600/10 transition duration-300 shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div> 
      </section>
    </div>
  )
}

export default SeoReferralProgram