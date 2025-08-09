"use client";

import { motion } from "motion/react";
import { 
  Cloud, 
  Code, 
  GitBranch, 
  MessageCircle, 
  FileText, 
  Settings, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Cloud Architecture Consulting",
      description: "Design scalable, secure, and cost-effective cloud solutions tailored to your business needs.",
      icon: Cloud,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Infrastructure as Code (IaC) Development",
      description: "Terraform, CDK, and automated deployments for consistent, repeatable infrastructure.",
      icon: Code,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "DevOps and CI/CD",
      description: "Streamline your development workflow with automated testing, deployment, and monitoring.",
      icon: GitBranch,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Automation",
      description: "Implement intelligent automation solutions to reduce manual tasks and improve operational efficiency.",
      icon: Settings,
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Consultation",
      description: "We start by understanding your requirements, current infrastructure, and business goals.",
      icon: MessageCircle
    },
    {
      step: 2,
      title: "Design & Proposal",
      description: "I create detailed architecture diagrams and provide comprehensive cost estimates for your project.",
      icon: FileText
    },
    {
      step: 3,
      title: "Implementation",
      description: "Build and configure your infrastructure using industry best practices and modern tools.",
      icon: Settings
    },
    {
      step: 4,
      title: "Handover & Documentation",
      description: "Complete knowledge transfer with training sessions and comprehensive documentation delivery.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Services Header - Different Design */}
        <section className="py-16 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Professional Services
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  I help clients build robust, scalable cloud solutions with modern automation practices.
                  From architecture design to full implementation, I deliver professional results that drive business value.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card rounded-lg p-4 border border-border/50">
                      <Cloud className="w-8 h-8 text-blue-500 mb-2" />
                      <p className="text-sm font-medium">Cloud Architecture</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border/50">
                      <Code className="w-8 h-8 text-purple-500 mb-2" />
                      <p className="text-sm font-medium">Infrastructure as Code</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border/50">
                      <GitBranch className="w-8 h-8 text-orange-500 mb-2" />
                      <p className="text-sm font-medium">DevOps & CI/CD</p>
                    </div>
                    <div className="bg-card rounded-lg p-4 border border-border/50">
                      <Settings className="w-8 h-8 text-cyan-500 mb-2" />
                      <p className="text-sm font-medium">Automation</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-6xl mx-auto relative">

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-8 border border-border hover:border-border/60 transition-all hover:shadow-lg group text-center h-full flex flex-col"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-2xl mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    href="/#contact"
                    className="bg-foreground text-background px-4 py-2 rounded font-medium hover:bg-foreground/90 transition-all mt-auto text-center"
                  >
                    MORE
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline - Expanded */}
        <section className="py-32 px-6 relative">
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A proven process that ensures successful project delivery from concept to completion
              </p>
            </motion.div>

            <div className="relative">
              {/* Process Steps with Interactive Flow */}
              <div className="space-y-16">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative flex items-center gap-12"
                  >
                    {/* Content Card */}
                    <div className="flex-1 max-w-2xl">
                      <div className="bg-card rounded-lg p-8 border border-border hover:border-blue-500/20 transition-all group">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all flex-shrink-0">
                            <step.icon className="w-8 h-8 text-blue-500" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-2xl mb-4">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Visual Connector */}
                    <div className="flex-shrink-0 w-32 h-32 relative">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full border-2 border-dashed border-blue-500/20 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        >
                          {step.step}
                        </motion.div>
                      </div>

                      {/* Arrow to next step */}
                      {index < processSteps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                          viewport={{ once: true }}
                          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
                        >
                          <div className="w-0.5 h-16 bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                          <ArrowRight className="w-6 h-6 text-blue-500/70 transform rotate-90 -mt-2 ml-1" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-secondary/20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Let's discuss your project requirements and explore how we can build a scalable, 
                secure solution that drives your business forward.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-lg"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-500/30 text-foreground px-8 py-4 rounded-lg font-medium hover:border-blue-500/60 hover:bg-blue-500/5 transition-all text-lg"
                >
                  View Past Work
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
