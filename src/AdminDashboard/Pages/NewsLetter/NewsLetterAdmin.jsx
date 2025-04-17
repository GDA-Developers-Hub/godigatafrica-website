"use client"

import { useState, useRef, useEffect } from "react"
import { sendNewsletter, getSubscribers } from "./NewsLetterActions"
import ImageUploader from "../../../Utils/ImageUploader"
import { Send, Eye, Users, Mail, ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react"
import { BASE_URL } from "../../../Utils/BaseUrl"

function NewsLetterAdmin() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("compose")
  const [previewLoading, setPreviewLoading] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    preheader: "Latest updates from Our Company",
    mainHeading: "",
    mainContent: "",
    ctaText: "Read More",
    ctaUrl: "https://example.com/blog",
    includeUnsubscribe: true,
    includeSocialLinks: true,
    testEmail: "",
  })
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=600&width=800")
  const [subscriberStats, setSubscriberStats] = useState({
    totalSubscribers: 0,
    openRate: 0,
    bounceRate: 0,
  })
  const [toastMessage, setToastMessage] = useState(null)
  const [toastType, setToastType] = useState("default") // default, success, error

  const iframeRef = useRef(null)

  useEffect(() => {
    const loadSubscriberData = async () => {
      try {
        const result = await getSubscribers()
        if (result.success) {
          setSubscriberStats({
            totalSubscribers: result.totalSubscribers || 0,
            openRate: result.openRate || 0,
            bounceRate: result.bounceRate || 0,
          })
        }
      } catch (error) {
        console.error("Failed to load subscriber data:", error)
        showToast("Failed to load subscriber data", "error")
      }
    }

    loadSubscriberData()
  }, [])

  const showToast = (message, type = "default") => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => {
      setToastMessage(null)
    }, 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setBackgroundImage(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const updatePreview = () => {
    if (iframeRef.current) {
      setPreviewLoading(true)
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        try {
          iframeDoc.open()
          iframeDoc.write(generateEmailHTML())
          iframeDoc.close()
        } catch (error) {
          console.error("Error updating preview:", error)
        } finally {
          setPreviewLoading(false)
        }
      }
    }
  }

  useEffect(() => {
    if (activeTab === "preview") {
      updatePreview()
    }
  }, [formData, backgroundImage, activeTab])

  const generateEmailHTML = () => {
    const { subject, preheader, mainHeading, mainContent, ctaText, ctaUrl, includeUnsubscribe, includeSocialLinks } =
      formData

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <meta name="description" content="${preheader}">
</head>
<body style="font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f4f7ff; margin: 5px; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); overflow: hidden; border-radius: 12px;">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; position: relative; overflow: hidden;">
      <img src="https://firebasestorage.googleapis.com/v0/b/automotive-5f3b5.firebasestorage.app/o/go-digital-africa%2F1742844240921_logo.png?alt=media&token=650be50c-4e88-4fd9-bd51-6c0aaf95acf6" alt="Company Logo" style="max-width: 200px; margin-bottom: 20px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.2); padding: 10px;">
      <h1 style="color: white; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">${subject}</h1>
    </div>
    
    <div style="background-image: url('${backgroundImage}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; padding: 40px 20px;">
      <div style="background-color: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 16px; max-width: 500px; width: 100%; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);">
        <h2 style="font-size: 28px; color: #3b82f6; margin-bottom: 25px; font-weight: 700;">${mainHeading}</h2>
        <div style="font-size: 16px; color: #4b5563; margin-bottom: 30px;">
          ${mainContent.replace(/\n/g, "<br>")}
        </div>
        <a href="${ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; text-decoration: none; padding: 14px 35px; border-radius: 60px; font-weight: 600; letter-spacing: 0.5px; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);">${ctaText}</a>
      </div>
    </div>
    
    <div style="background-color: #f9fafb; padding: 30px; text-align: center;">
      ${
        includeSocialLinks
          ? `<div style="margin-bottom: 20px;">
            <a href="https://web.facebook.com/AfricaGoDigital" style="margin: 0 12px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" style="width: 24px; height: 24px;">
            </a>
            <a href="https://x.com/GoAfricadigital" style="margin: 0 12px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/twitter.png" alt="Twitter" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.instagram.com/godigitalafrica.ke" style="margin: 0 12px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" style="width: 24px; height: 24px;">
            </a>
            <a href="https://www.linkedin.com/company/godigitalafrica" style="margin: 0 12px; text-decoration: none;">
                <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" style="width: 24px; height: 24px;">
            </a>
            </div>`
          : ""
      }
      <p style="margin: 0;">© ${new Date().getFullYear()} Company Name. All rights reserved.</p>
      ${
        includeUnsubscribe
          ? `<a href="${BASE_URL}/unsubscribe" style="display: inline-block; background-color: #e5e7eb; color: #4b5563; padding: 10px 20px; border-radius: 50px; text-decoration: none; font-size: 14px; margin-top: 15px;">
               Click to Unsubscribe
             </a>
             <p style="color: #6b7280; font-size: 12px; margin-top: 5px;">If the button doesn't work, please visit ${BASE_URL}/unsubscribe directly.</p>`
          : ""
      }
    </div>
  </div>
</body>
</html>
    `
  }

  const handleSendTest = async () => {
    if (!formData.testEmail) {
      showToast("Please enter a test email address", "error")
      return
    }

    setLoading(true)
    try {
      const result = await sendNewsletter({
        htmlContent: generateEmailHTML(),
        subject: formData.subject,
        recipients: [formData.testEmail],
        isTest: true,
      })

      if (result.success) {
        showToast(`Test email sent to ${formData.testEmail}`, "success")
      } else {
        showToast(result.message || "Failed to send test email", "error")
      }
    } catch (error) {
      console.error("Error sending test email:", error)
      showToast("Failed to send test email", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleSendNewsletter = async () => {
    setLoading(true)
    try {
      const result = await sendNewsletter({
        htmlContent: generateEmailHTML(),
        subject: formData.subject,
        isTest: false,
      })

      if (result.success) {
        showToast("Newsletter sent to all subscribers", "success")
      } else {
        showToast(result.message || "Failed to send newsletter", "error")
      }
    } catch (error) {
      console.error("Error sending newsletter:", error)
      showToast("Failed to send newsletter", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 py-12 bg-slate-900 w-full">
      <div className="opacity-100 translate-y-0 transition-all duration-500">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-white">
              Newsletter Management
            </h1>
            <p className="text-gray-100 mt-2">Create and send beautiful HTML newsletters to your subscribers</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              className="px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900 disabled:text-gray-400"
              onClick={() => {
                setActiveTab("preview")
              }}
              disabled={loading}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              className="px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300"
              onClick={handleSendTest}
              disabled={loading || !formData.testEmail}
            >
              <Mail className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Test"}
            </button>
            <button
              className="px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-50"
              onClick={handleSendNewsletter}
              disabled={loading}
            >
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Sending..." : "Send Newsletter"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 shadow-lg backdrop-blur-sm bg-slate-800/90 border border-slate-700 rounded-lg">
              <div className="w-full">
                <div className="flex border-b border-gray-600 mb-6">
                  <button
                    className={`pb-2 px-4 text-center ${
                      activeTab === "compose"
                        ? "border-b-2 border-cyan-500 text-cyan-500"
                        : "text-gray-100 text-bold hover:text-cyan-300"
                    }`}
                    onClick={() => setActiveTab("compose")}
                  >
                    Compose
                  </button>
                  <button
                    className={`pb-2 px-4 text-center ${
                      activeTab === "design"
                        ? "border-b-2 border-cyan-500 text-cyan-500"
                        : "text-gray-100 text-bold hover:text-cyan-300"
                    }`}
                    onClick={() => setActiveTab("design")}
                  >
                    Design
                  </button>
                  <button
                    className={`pb-2 px-4 text-center ${
                      activeTab === "preview"
                        ? "border-b-2 border-cyan-500 text-cyan-500"
                        : "text-gray-100 text-bold hover:text-cyan-300"
                    }`}
                    onClick={() => {
                      setActiveTab("preview")
                      updatePreview()
                    }}
                  >
                    Preview
                  </button>
                </div>

                {activeTab === "compose" && (
                  <div className="space-y-6 text-cyan-400">
                    <div className="space-y-1">
                      <label htmlFor="subject" className="block text-sm font-medium text-white">
                        Email Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter newsletter subject"
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="preheader" className="block text-sm font-medium text-white">
                        Preheader Text
                      </label>
                      <input
                        type="text"
                        id="preheader"
                        name="preheader"
                        value={formData.preheader}
                        onChange={handleChange}
                        placeholder="Brief summary shown in email clients"
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="mainHeading" className="block text-sm font-medium text-white">
                        Main Heading
                      </label>
                      <input
                        type="text"
                        id="mainHeading"
                        name="mainHeading"
                        value={formData.mainHeading}
                        onChange={handleChange}
                        placeholder="Main newsletter heading"
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="mainContent" className="block text-sm font-medium text-white">
                        Newsletter Content
                      </label>
                      <textarea
                        id="mainContent"
                        name="mainContent"
                        value={formData.mainContent}
                        onChange={handleChange}
                        placeholder="Write your newsletter content here..."
                        rows={10}
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none min-h-[200px]"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "design" && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label htmlFor="ctaText" className="block text-sm font-medium text-white">
                        Call-to-Action Text
                      </label>
                      <input
                        type="text"
                        id="ctaText"
                        name="ctaText"
                        value={formData.ctaText}
                        onChange={handleChange}
                        placeholder="Read More"
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ctaUrl" className="block text-sm font-medium text-white">
                        Call-to-Action URL
                      </label>
                      <input
                        type="text"
                        id="ctaUrl"
                        name="ctaUrl"
                        value={formData.ctaUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/blog"
                        className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-100 mb-1">
                        Background Image (Optional)
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="h-5 w-5 text-cyan-500" />
                        <span className="text-sm text-cyan-500">Upload a background image for the newsletter</span>
                      </div>

                      <ImageUploader onSaveUrl={(url) => setBackgroundImage(url)} />

                      {backgroundImage && backgroundImage !== "/placeholder.svg?height=600&width=800" && (
                        <div className="mt-4">
                          <p className="text-xs text-gray-300 mb-1">Preview:</p>
                          <img
                            src={backgroundImage || "/placeholder.svg"}
                            alt="Background Preview"
                            className="w-full max-w-md h-40 object-cover rounded-lg border border-gray-700"
                          />
                          <p className="text-xs text-gray-400 mt-1 break-all">
                            <strong className="text-cyan-500">Background Image URL:</strong> {backgroundImage}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        id="includeUnsubscribe"
                        role="switch"
                        aria-checked={formData.includeUnsubscribe}
                        onClick={() => handleSwitchChange("includeUnsubscribe", !formData.includeUnsubscribe)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          formData.includeUnsubscribe ? "bg-indigo-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.includeUnsubscribe ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <label htmlFor="includeUnsubscribe" className="text-sm font-medium text-white">
                        Include Unsubscribe Link
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        id="includeSocialLinks"
                        role="switch"
                        aria-checked={formData.includeSocialLinks}
                        onClick={() => handleSwitchChange("includeSocialLinks", !formData.includeSocialLinks)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          formData.includeSocialLinks ? "bg-indigo-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            formData.includeSocialLinks ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                      <label htmlFor="includeSocialLinks" className="text-sm font-medium text-white">
                        Include Social Media Links
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "preview" && (
                  <div className="space-y-6">
                    <div className="bg-slate-800 p-4 rounded-lg relative">
                      {previewLoading && (
                        <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center rounded-lg z-10">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                        </div>
                      )}
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
                        <iframe
                          ref={iframeRef}
                          title="Email Preview"
                          className="w-full h-full border-0"
                          onLoad={() => setPreviewLoading(false)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="p-6 shadow-lg backdrop-blur-sm bg-slate-800/90 border border-slate-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-white">Send Test Email</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="testEmail" className="block text-sm font-medium text-white">
                    Test Email Address
                  </label>
                  <input
                    type="text"
                    id="testEmail"
                    name="testEmail"
                    value={formData.testEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 bg-slate-800 text-white border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <button
                  className="w-full px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-indigo-300"
                  onClick={handleSendTest}
                  disabled={loading || !formData.testEmail}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {loading ? "Sending..." : "Send Test Email"}
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white">Subscriber Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg text-white">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-indigo-500 mr-2" />
                      <span>Total Subscribers</span>
                    </div>
                    <span className="font-semibold text-cyan-400">{subscriberStats.totalSubscribers}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg text-white">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      <span>Open Rate</span>
                    </div>
                    <span className="font-semibold text-cyan-400">{subscriberStats.openRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg text-white">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                      <span>Bounce Rate</span>
                    </div>
                    <span className="font-semibold text-cyan-400">{subscriberStats.bounceRate}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-slate-900 disabled:text-gray-400"
                  onClick={() => showToast("Subscriber management page would open here")}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Manage Subscribers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
            toastType === "success"
              ? "bg-green-50 border-green-500"
              : toastType === "error"
                ? "bg-red-50 border-red-500"
                : "bg-blue-50 border-blue-500"
          } border-l-4 z-50 max-w-md`}
        >
          <div
            className={`${
              toastType === "success" ? "text-green-800" : toastType === "error" ? "text-red-800" : "text-blue-800"
            } font-medium`}
          >
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsLetterAdmin

