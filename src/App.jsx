import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, FileText, Download, Database, Search, FileEdit, Upload, X, Mic } from 'lucide-react'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'conceptualization', 'create-concept-note', 'search-form', 'search-results', 'proposal-development', 'donor-intelligence', 'donor-info-form', 'donor-scoping-form', 'donor-info-results', 'donor-scoping-results', 'develop-proposal', 'build-matrix-form', 'review-matrix-form', 'results-matrix', 'full-proposal', 'endorsement'
  const [previousView, setPreviousView] = useState('home');
  const [formData, setFormData] = useState({
    projectName: '',
    issueDescription: '',
    benefittingCountries: '',
    implementingMission: '',
    fundingSource: '',
    thematicArea: ''
  })
  const [searchData, setSearchData] = useState({
    keywords: '',
    benefittingCountry: '',
    donor: '',
    thematicArea: '',
    conceptNotes: true,
    activeProjects: true,
    completedProjects: true
  })
  const [donorInDepthData, setDonorInDepthData] = useState({
    donorName: '',
    thematicArea: '',
    countryRegion: '',
    shortDescription: '',
    documents: []
  })
  
  const [donorScopingData, setDonorScopingData] = useState({
    countryRegion: '',
    thematicArea: '',
    shortDescription: '',
    includePrivateSector: false,
    documents: []
  })

  // Develop Proposal state
  const [buildMatrixData, setBuildMatrixData] = useState({
    additionalInfo: '',
    documents: []
  })
  
  const [reviewMatrixData, setReviewMatrixData] = useState({
    additionalInfo: '',
    matrixDocument: null,
    documents: []
  })

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [donorInDepthFiles, setDonorInDepthFiles] = useState([])
  const [donorScopingFiles, setDonorScopingFiles] = useState([])
  const [generatedConcept, setGeneratedConcept] = useState('')
  const [editableConcept, setEditableConcept] = useState('')
  const [isEditingConcept, setIsEditingConcept] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleBuildMatrixChange = (field, value) => {
    setBuildMatrixData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReviewMatrixChange = (field, value) => {
    setReviewMatrixData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleBuildMatrixFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setBuildMatrixData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newFiles]
    }))
  }

  const handleReviewMatrixFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setReviewMatrixData(prev => ({
      ...prev,
      documents: [...prev.documents, ...newFiles]
    }))
  }

  const handleMatrixDocumentUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setReviewMatrixData(prev => ({
        ...prev,
        matrixDocument: {
          id: Date.now(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        }
      }))
    }
  }

  const removeBuildMatrixFile = (fileId) => {
    setBuildMatrixData(prev => ({
      ...prev,
      documents: prev.documents.filter(file => file.id !== fileId)
    }))
  }

  const removeReviewMatrixFile = (fileId) => {
    setReviewMatrixData(prev => ({
      ...prev,
      documents: prev.documents.filter(file => file.id !== fileId)
    }))
  }

  const removeMatrixDocument = () => {
    setReviewMatrixData(prev => ({
      ...prev,
      matrixDocument: null
    }))
  }

  const downloadResultsMatrix = () => {
    // Get all textarea values from the results matrix
    const textareas = document.querySelectorAll('textarea')
    let content = "RESULTS MATRIX\n\n"
    
    // Extract content from textareas and format as markdown
    content += "## Objective\n"
    content += textareas[0]?.value || "" + "\n\n"
    
    content += "### Indicators:\n"
    content += "- " + (textareas[1]?.value || "") + "\n"
    content += "- " + (textareas[3]?.value || "") + "\n\n"
    
    content += "### Data Source and Collection Method:\n"
    content += textareas[2]?.value || "" + "\n\n"
    
    content += "### Baseline:\n"
    content += "- " + (textareas[4]?.value || "") + "\n"
    content += "- " + (textareas[6]?.value || "") + "\n\n"
    
    content += "### Target:\n"
    content += "- " + (textareas[5]?.value || "") + "\n"
    content += "- " + (textareas[7]?.value || "") + "\n\n"
    
    content += "## Outcome 1\n"
    content += textareas[9]?.value || "" + "\n\n"
    
    content += "### Indicators:\n"
    content += "- " + (textareas[10]?.value || "") + "\n"
    content += "- " + (textareas[12]?.value || "") + "\n\n"
    
    content += "### Data Source:\n"
    content += textareas[11]?.value || "" + "\n\n"
    
    content += "### Baseline:\n"
    content += "- " + (textareas[13]?.value || "") + "\n"
    content += "- " + (textareas[15]?.value || "") + "\n\n"
    
    content += "### Target:\n"
    content += "- " + (textareas[14]?.value || "") + "\n"
    content += "- " + (textareas[16]?.value || "") + "\n\n"
    
    content += "### Assumptions:\n"
    content += textareas[17]?.value || "" + "\n\n"
    
    content += "## Output 1.1\n"
    content += textareas[18]?.value || "" + "\n\n"
    
    content += "### Activities:\n"
    content += textareas[26]?.value || "" + "\n\n"
    
    content += "## Output 1.2\n"
    content += textareas[27]?.value || "" + "\n\n"
    
    content += "### Activities:\n"
    content += textareas[34]?.value || "" + "\n\n"
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'results-matrix.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSearchChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDonorInDepthChange = (field, value) => {
    setDonorInDepthData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDonorScopingChange = (field, value) => {
    setDonorScopingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (field, checked) => {
    setSearchData(prev => ({
      ...prev,
      [field]: checked
    }))
  }

  const performSearch = async () => {
    setIsSearching(true)
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSearching(false)
    setCurrentView('search-results')
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleDonorInDepthFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setDonorInDepthFiles(prev => [...prev, ...newFiles])
  }

  const handleDonorScopingFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }))
    setDonorScopingFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const removeDonorInDepthFile = (fileId) => {
    setDonorInDepthFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const removeDonorScopingFile = (fileId) => {
    setDonorScopingFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const generateConceptNote = async () => {
    setIsGenerating(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const conceptNote = `# Concept Note

**Title:** ${formData.projectName}

## 1. Project Rationale

${formData.issueDescription} represents a significant challenge that requires comprehensive intervention. This project addresses core problems affecting vulnerable populations in ${formData.benefittingCountries}, with particular focus on ${formData.thematicArea || 'migration and displacement issues'}.

The main stakeholders include government institutions, civil society organizations, international partners, and the affected communities themselves. The intended beneficiaries are migrants, displaced populations, and host communities who face various challenges related to protection, assistance, and integration.

This project aligns with national and regional priorities for migration governance, human rights protection, and sustainable development. The initiative directly supports relevant national migration policies and strategies in ${formData.benefittingCountries}, contributing to regional cooperation frameworks and agreements.

The relevance to donor priorities is evident through its alignment with international development goals, humanitarian principles, and migration governance frameworks. The project addresses critical gaps in current responses while building on existing partnerships and proven approaches.

The comprehensive nature of this intervention ensures that root causes are addressed while providing immediate assistance to those in need. Through evidence-based programming and stakeholder engagement, the project will contribute to sustainable solutions that benefit both migrants and host communities.

## 2. Proposed Response

The proposed response envisions a transformed situation where vulnerable populations have access to protection, assistance, and durable solutions. This comprehensive approach will establish sustainable mechanisms for addressing migration challenges while strengthening institutional capacity.

The main outcomes include enhanced protection services, improved coordination mechanisms, strengthened institutional capacity, and increased access to basic services. Key activities will focus on direct assistance provision, capacity building initiatives, policy development support, and community engagement programs.

Based on research and strategic frameworks, the project will implement evidence-based interventions that address both immediate needs and long-term solutions. The approach emphasizes partnership, sustainability, and measurable impact.

## 3. IOM Capacity to Address the Issue

IOM's comparative advantage lies in its extensive operational experience, technical expertise, and established partnerships in migration management. The organization brings decades of experience in protection, assistance, and durable solutions programming.

Key strengths include operational capacity in challenging environments, technical expertise in migration governance, established relationships with beneficiaries and partners, and proven track record in similar contexts. IOM's global network and local presence enable effective program implementation and coordination.

Lessons learned from previous projects inform the design and implementation approach, ensuring that best practices are incorporated while avoiding common pitfalls. The organization's neutral mandate and trusted convening role facilitate multi-stakeholder engagement and coordination.

## 4. Partners

Key partners include government institutions responsible for migration management, civil society organizations working with affected populations, international organizations with complementary mandates, and academic institutions providing research and evaluation support.

Government partners will include relevant ministries, border management agencies, and local authorities. Civil society partners encompass organizations providing direct services, advocacy groups, and community-based organizations representing beneficiary interests.

International partners include UN agencies, bilateral donors, regional organizations, and other implementing partners with relevant expertise and resources. These partnerships ensure comprehensive coverage, avoid duplication, and maximize impact through coordinated approaches.

## 5. Risk Register

**Political instability and policy changes** - High consequence, Medium likelihood (Timeline: B) - Could significantly impact program implementation and beneficiary access to services.

**Funding shortfalls and resource constraints** - High consequence, Medium likelihood (Timeline: C) - May require program adjustments and prioritization of critical activities.

**Security concerns and access limitations** - Medium consequence, Low likelihood (Timeline: D) - Could affect field operations and direct service delivery in certain areas.

**Coordination challenges among stakeholders** - Medium consequence, Medium likelihood (Timeline: B) - May impact program efficiency and effectiveness without proper management.

**Beneficiary identification and targeting difficulties** - Medium consequence, Low likelihood (Timeline: C) - Could affect program reach and impact measurement.

---

**Generated on:** ${new Date().toLocaleDateString()}
**Implementing Mission:** ${formData.implementingMission}
**Funding Source:** ${formData.fundingSource || 'To be identified'}
**Thematic Area:** ${formData.thematicArea || 'General Migration Management'}
**Target Countries:** ${formData.benefittingCountries}`

    setGeneratedConcept(conceptNote)
    setEditableConcept(conceptNote)
    setIsEditingConcept(false)
    setIsGenerating(false)
    setCurrentView('concept-output')
  }

  const downloadConcept = () => {
    const element = document.createElement('a')
    const file = new Blob([editableConcept || generatedConcept], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `concept_note_${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const toggleEditMode = () => {
    if (!isEditingConcept) {
      // Entering edit mode - initialize editable content if not already set
      if (!editableConcept) {
        setEditableConcept(generatedConcept)
      }
    }
    setIsEditingConcept(!isEditingConcept)
  }

  const saveConceptChanges = () => {
    setIsEditingConcept(false)
    // The editableConcept state already contains the changes
  }

  const cancelConceptEdit = () => {
    setEditableConcept(generatedConcept) // Reset to original
    setIsEditingConcept(false)
  }

  const navigateToDonorIntelligence = (fromView) => {
    setPreviousView(fromView)
    setCurrentView('donor-intelligence')
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* Circular Layout */}
          <div className="relative w-[700px] h-[700px] mx-auto">
            {/* Center Oval */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-200">
              <div className="text-center px-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">AI AMPLIFIED</h1>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">IOM PROJECT CYCLE</h2>
                <p className="text-sm text-gray-600">Interactive Project Management Tool</p>
              </div>
            </div>
            
            {/* Circular Steps */}
            {[
              { 
                title: "CONCEPTUALIZATION", 
                color: "bg-blue-600", 
                angle: -90, // Top
                onClick: () => setCurrentView('conceptualization')
              },
              { 
                title: "PROPOSAL\nDEVELOPMENT", 
                color: "bg-blue-400", 
                angle: -30, // Top right
                onClick: () => setCurrentView('proposal-development')
              },
              { 
                title: "PROJECT\nENDORSEMENT,\nSUBMISSION AND\nACTIVATION", 
                color: "bg-teal-500", 
                angle: 30, // Bottom right
                onClick: () => setCurrentView('endorsement')
              },
              { 
                title: "PROJECT\nMANAGEMENT AND\nMONITORING", 
                color: "bg-yellow-500", 
                angle: 90, // Bottom
                onClick: null
              },
              { 
                title: "DONOR REPORTING", 
                color: "bg-orange-500", 
                angle: 150, // Bottom left
                onClick: () => setCurrentView('donor-reporting')
              },
              { 
                title: "EVALUATION", 
                color: "bg-red-500", 
                angle: 210, // Top left
                onClick: null
              }
            ].map((step, index) => {
              const radius = 250;
              const angleRad = (step.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              
              // Calculate label position (further out)
              const labelRadius = 320;
              const labelX = Math.cos(angleRad) * labelRadius;
              const labelY = Math.sin(angleRad) * labelRadius;
              
              return (
                <div key={index}>
                  {/* Circle Node */}
                  <div
                    className={`absolute w-16 h-16 rounded-full ${step.color} shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center`}
                    style={{
                      left: `calc(50% + ${x}px - 32px)`,
                      top: `calc(50% + ${y}px - 32px)`,
                    }}
                    onClick={step.onClick}
                  >
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Label */}
                  <div
                    className="absolute text-center"
                    style={{
                      left: `calc(50% + ${labelX}px)`,
                      top: `calc(50% + ${labelY}px)`,
                      transform: 'translate(-50%, -50%)',
                      width: '120px'
                    }}
                  >
                    <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 leading-tight whitespace-pre-line">
                        {step.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <circle
                cx="350"
                cy="350"
                r="250"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </svg>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-600 text-lg mb-2">Click on any step to explore AI-powered project management tools</p>
            <p className="text-sm text-gray-500">International Organization for Migration (IOM)</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'conceptualization') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project Cycle
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Conceptualization</h1>
            <p className="text-gray-600">Do you want to...</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-600">Generate a Concept Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Create a new concept note with AI assistance</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentView('concept-form')}
                >
                  Create Concept Note
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-400">Find an existing Concept Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Search and access previously created concept notes</p>
                <Button 
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white"
                  onClick={() => setCurrentView('search-form')}
                >
                  Search Concept Notes
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-purple-600">Donor Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Research donors and funding opportunities for your concept</p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigateToDonorIntelligence('conceptualization')}
                >
                  Research Donors
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2">
                  <FileEdit className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-teal-600">Explore Prompts for Research and Conceptualization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Discover guided prompts to help with research and ideation</p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-gray-500 mt-8">AI Amplified IOM Project Cycle - Conceptualization Phase</p>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-reporting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project Cycle
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Reporting</h1>
            <p className="text-gray-600">Do you want to...</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-orange-600">Generate Donor Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Create comprehensive donor reports with AI assistance</p>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-orange-400">Find Existing Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Search and access previously created donor reports</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-purple-600">Donor Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Research donors and analyze reporting requirements</p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigateToDonorIntelligence('donor-reporting')}
                >
                  Research Donors
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-gray-500 mt-8">AI Amplified IOM Project Cycle - Donor Reporting Phase</p>
        </div>
      </div>
    )
  }

  if (currentView === 'concept-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('conceptualization')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Conceptualization
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Create Concept Note</CardTitle>
              <p className="text-gray-600">Create a new concept note with AI assistance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="issueDescription" className="text-lg font-semibold text-gray-800 mb-3 block">
                  Describe the Issue or Challenge *
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  This is the main focus of your concept note. Provide a detailed description of the issue or challenge that this project aims to address.
                </p>
                <div className="relative">
                  <Textarea
                    id="issueDescription"
                    placeholder="Describe the issue or challenge in detail. What problem are you trying to solve? Who is affected? What is the current situation? What are the root causes?"
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    className="mt-1 min-h-[200px] pr-12 text-base leading-relaxed"
                    rows={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    title="Record your description (coming soon)"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Tip: Click the microphone icon to record your description (feature coming soon)
                </p>
              </div>
              
              <div>
                <Label htmlFor="benefittingCountries" className="text-sm font-medium text-gray-700">
                  Benefitting Countries
                </Label>
                <Input
                  id="benefittingCountries"
                  placeholder="Enter the countries that will benefit from this project (optional)"
                  value={formData.benefittingCountries}
                  onChange={(e) => handleInputChange('benefittingCountries', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="implementingMission" className="text-sm font-medium text-gray-700">
                  Implementing Mission
                </Label>
                <Input
                  id="implementingMission"
                  placeholder="Enter the implementing mission or office (optional)"
                  value={formData.implementingMission}
                  onChange={(e) => handleInputChange('implementingMission', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="fundingSource" className="text-sm font-medium text-gray-700">
                  Funding Source Identified
                </Label>
                <Input
                  id="fundingSource"
                  placeholder="Enter the funding source (optional)"
                  value={formData.fundingSource}
                  onChange={(e) => handleInputChange('fundingSource', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="thematicArea" className="text-sm font-medium text-gray-700">
                  Thematic Area
                </Label>
                <Input
                  id="thematicArea"
                  placeholder="e.g., child protection, labour mobility"
                  value={formData.thematicArea}
                  onChange={(e) => handleInputChange('thematicArea', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              {/* Document Upload Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Additional Documents
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload supporting documents such as meeting notes, country strategies, research, etc.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</p>
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                onClick={generateConceptNote}
                disabled={!formData.issueDescription || isGenerating}
              >
                {isGenerating ? 'Generating Concept Note...' : 'Create Concept Note'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'concept-output') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('concept-form')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Generated Concept Note</h1>
            <div className="flex gap-3">
              {isEditingConcept ? (
                <>
                  <Button 
                    onClick={saveConceptChanges} 
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <FileEdit className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={cancelConceptEdit}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={toggleEditMode} 
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <FileEdit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={downloadConcept} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Card className="shadow-lg mb-6">
            <CardContent className="p-8">
              {isEditingConcept ? (
                <div>
                  <Label htmlFor="editableConcept" className="text-sm font-medium text-gray-700 mb-3 block">
                    Edit your concept note below:
                  </Label>
                  <Textarea
                    id="editableConcept"
                    value={editableConcept}
                    onChange={(e) => setEditableConcept(e.target.value)}
                    className="min-h-[600px] font-mono text-sm leading-relaxed resize-y"
                    placeholder="Edit your concept note content here..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Tip: You can modify any part of the generated concept note. Your changes will be saved when you click "Save Changes".
                  </p>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {editableConcept || generatedConcept}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex gap-4 justify-center">
            {!isEditingConcept && (
              <>
                <Button onClick={downloadConcept} className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" disabled>
                  <Database className="w-4 h-4 mr-2" />
                  Upload to Database
                </Button>
                <Button variant="outline" disabled>
                  <Search className="w-4 h-4 mr-2" />
                  Find Potential Donor
                </Button>
                <Button variant="outline" disabled>
                  <FileEdit className="w-4 h-4 mr-2" />
                  Develop Proposal
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'proposal-development') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project Cycle
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileEdit className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposal Development</h1>
            <p className="text-gray-600 text-lg">Do you want to...</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-600">Donor Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Do you want to find a donor or need in-depth information on a donor?</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://ashy-sand-0933f7803.1.azurestaticapps.net/', '_blank')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                  <FileEdit className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-400">Develop a Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get support with writing a proposal and the results-matrix</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentView('develop-proposal')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-teal-600">Explore Prompts for Proposal Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Discover guided prompts to help with proposal development</p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500">AI Amplified IOM Project Cycle - Proposal Development Phase</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-intelligence') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView(previousView)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {previousView === 'conceptualization' ? 'Conceptualization' : 
                     previousView === 'donor-reporting' ? 'Donor Reporting' : 
                     'Proposal Development'}
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Donor Intelligence</h1>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              This tool can help you get in-depth real time information on a specific donor to align your proposal, 
              or help you find potential donors for a project
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-600">In-depth Information on Donor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get comprehensive information about a specific donor to align your proposal strategy</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentView('donor-indepth-form')}
                >
                  Get Donor Information
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <CardTitle className="text-blue-400">Donor Scoping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Find potential donors that match your project's thematic area and geographic focus</p>
                <Button 
                  className="w-full bg-blue-400 hover:bg-blue-500"
                  onClick={() => setCurrentView('donor-scoping-form')}
                >
                  Find Potential Donors
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500">AI Amplified IOM Project Cycle - Donor Intelligence</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-indepth-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('donor-intelligence')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Donor Intelligence
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">In-depth Information on Donor</CardTitle>
              <p className="text-gray-600">Get comprehensive information about a specific donor</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="donorName" className="text-sm font-medium text-gray-700">
                  Name of Donor *
                </Label>
                <Input
                  id="donorName"
                  placeholder="Enter the donor organization name"
                  value={donorInDepthData.donorName}
                  onChange={(e) => handleDonorInDepthChange('donorName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="donorThematicArea" className="text-sm font-medium text-gray-700">
                  Thematic Area
                </Label>
                <Input
                  id="donorThematicArea"
                  placeholder="e.g., child protection, labour mobility, emergency response"
                  value={donorInDepthData.thematicArea}
                  onChange={(e) => handleDonorInDepthChange('thematicArea', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="donorCountryRegion" className="text-sm font-medium text-gray-700">
                  Country/Region
                </Label>
                <Input
                  id="donorCountryRegion"
                  placeholder="Enter country or region of interest"
                  value={donorInDepthData.countryRegion}
                  onChange={(e) => handleDonorInDepthChange('countryRegion', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="donorShortDescription" className="text-sm font-medium text-gray-700">
                  Short Description
                </Label>
                <Textarea
                  id="donorShortDescription"
                  placeholder="Provide a brief description of your project or proposal context"
                  value={donorInDepthData.shortDescription}
                  onChange={(e) => handleDonorInDepthChange('shortDescription', e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              {/* Document Upload Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Additional Documents
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload supporting documents such as concept note, proposal, country strategy, etc.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleDonorInDepthFileUpload}
                    className="hidden"
                    id="donor-indepth-file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                  />
                  <label htmlFor="donor-indepth-file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</p>
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {donorInDepthFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {donorInDepthFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDonorInDepthFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                disabled={!donorInDepthData.donorName.trim()}
                onClick={() => setCurrentView('donor-indepth-results')}
              >
                Get Donor Information
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-scoping-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('donor-intelligence')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Donor Intelligence
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Donor Scoping</CardTitle>
              <p className="text-gray-600">Find potential donors that match your project criteria</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="scopingCountryRegion" className="text-sm font-medium text-gray-700">
                  Country/Region *
                </Label>
                <Input
                  id="scopingCountryRegion"
                  placeholder="Enter country or region for your project"
                  value={donorScopingData.countryRegion}
                  onChange={(e) => handleDonorScopingChange('countryRegion', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="scopingThematicArea" className="text-sm font-medium text-gray-700">
                  Thematic Area
                </Label>
                <Input
                  id="scopingThematicArea"
                  placeholder="e.g., child protection, labour mobility, emergency response"
                  value={donorScopingData.thematicArea}
                  onChange={(e) => handleDonorScopingChange('thematicArea', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="scopingShortDescription" className="text-sm font-medium text-gray-700">
                  Short Description
                </Label>
                <Textarea
                  id="scopingShortDescription"
                  placeholder="Provide a brief description of your project or funding needs"
                  value={donorScopingData.shortDescription}
                  onChange={(e) => handleDonorScopingChange('shortDescription', e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              {/* Private Sector Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includePrivateSector"
                  checked={donorScopingData.includePrivateSector}
                  onChange={(e) => handleDonorScopingChange('includePrivateSector', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="includePrivateSector" className="text-sm font-medium text-gray-700">
                  Include private sector donors in search
                </Label>
              </div>
              
              {/* Document Upload Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Supporting Documents
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload supporting documents such as project outline, country strategy, research, etc.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleDonorScopingFileUpload}
                    className="hidden"
                    id="donor-scoping-file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                  />
                  <label htmlFor="donor-scoping-file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</p>
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {donorScopingFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {donorScopingFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDonorScopingFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-lg py-3"
                disabled={!donorScopingData.countryRegion.trim()}
                onClick={() => setCurrentView('donor-scoping-results')}
              >
                Find Potential Donors
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-indepth-results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('donor-indepth-form')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">European Union - Comprehensive Donor Profile</h1>
            <p className="text-gray-600">In-depth analysis for proposal alignment and strategic engagement</p>
          </div>
          
          <div className="space-y-6">
            {/* Key Entities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">1. Key Entities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Primary Institutions</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">European Commission - Directorate-General for International Partnerships (DG INTPA)</p>
                      <p className="text-sm text-gray-600">Role: Policy development and implementation of EU external action, including migration and development cooperation</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Directorate-General for Migration and Home Affairs (DG HOME)</p>
                      <p className="text-sm text-gray-600">Role: Internal migration policy, external migration partnerships, and border management coordination</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">European Civil Protection and Humanitarian Aid Operations (DG ECHO)</p>
                      <p className="text-sm text-gray-600">Role: Humanitarian response, disaster risk reduction, and emergency preparedness in displacement contexts</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Coordination Mechanisms</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>EU Migration Partnership Framework - coordinates migration-related funding across DGs</li>
                    <li>Team Europe Initiatives - joint programming with member states for migration governance</li>
                    <li>EU Trust Funds (EUTF) - pooled funding mechanisms for migration and displacement responses</li>
                    <li>Global Approach to Migration and Mobility (GAMM) - strategic framework for external migration policy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Funding Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">2. Funding Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Recent Contributions to IOM</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                      <span>2023: Core Funding</span>
                      <span className="font-semibold">€45.2 million</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                      <span>2023: Earmarked Funding</span>
                      <span className="font-semibold">€312.8 million</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                      <span>2022: Total Contributions</span>
                      <span className="font-semibold">€298.5 million</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                      <span>2021: Total Contributions</span>
                      <span className="font-semibold">€267.3 million</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Funding Flexibility</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="font-medium text-green-800">Core Funding</p>
                      <p className="text-sm text-green-600">12% of total</p>
                      <p className="text-xs text-green-500">High flexibility</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                      <p className="font-medium text-yellow-800">Softly Earmarked</p>
                      <p className="text-sm text-yellow-600">35% of total</p>
                      <p className="text-xs text-yellow-500">Regional/thematic</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <p className="font-medium text-red-800">Tightly Earmarked</p>
                      <p className="text-sm text-red-600">53% of total</p>
                      <p className="text-xs text-red-500">Project-specific</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Funding Mechanisms</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>EU Trust Fund for Africa:</strong> €5.2 billion total, focus on migration root causes</li>
                    <li><strong>Neighbourhood, Development and International Cooperation Instrument (NDICI):</strong> €79.5 billion (2021-2027)</li>
                    <li><strong>Asylum, Migration and Integration Fund (AMIF):</strong> €9.9 billion (2021-2027)</li>
                    <li><strong>Humanitarian Aid:</strong> Direct implementation and partner funding through DG ECHO</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Strategic Shifts</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Green Transition:</strong> 30% climate mainstreaming requirement across all external action</li>
                    <li><strong>Digital Solutions:</strong> Emphasis on digital identity, e-governance, and tech-enabled service delivery</li>
                    <li><strong>Nexus Approach:</strong> Integration of humanitarian-development-peace programming</li>
                    <li><strong>Private Sector Engagement:</strong> Blended finance mechanisms and innovative financing instruments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Thematic Priorities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">3. Thematic Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Core Priorities (Longstanding Focus)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-800">Migration Governance</p>
                      <p className="text-sm text-blue-600">Legal migration pathways, diaspora engagement, migration data systems</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-800">Displacement Response</p>
                      <p className="text-sm text-blue-600">Humanitarian assistance, durable solutions, protection mainstreaming</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-800">Border Management</p>
                      <p className="text-sm text-blue-600">Integrated border management, counter-trafficking, return and reintegration</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-blue-800">Development Cooperation</p>
                      <p className="text-sm text-blue-600">Addressing root causes of migration, sustainable development, poverty reduction</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Emerging Priorities (New Focus Areas)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium text-green-800">Climate Mobility</p>
                      <p className="text-sm text-green-600">Climate-induced displacement, adaptation, resilience building, planned relocation</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium text-green-800">Digital Identity</p>
                      <p className="text-sm text-green-600">Digital ID systems, blockchain for credentials, interoperable platforms</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium text-green-800">Private Sector Engagement</p>
                      <p className="text-sm text-green-600">Labour mobility partnerships, skills recognition, diaspora investment</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium text-green-800">Innovation & Technology</p>
                      <p className="text-sm text-green-600">AI for migration management, predictive analytics, digital service delivery</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Overlapping UN Agency Partnerships</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>UNHCR:</strong> Joint programming on displacement, protection, and durable solutions (€156M in 2023)</li>
                    <li><strong>UNDP:</strong> Development-migration nexus, governance, and climate adaptation (€89M in 2023)</li>
                    <li><strong>UNICEF:</strong> Child protection in migration contexts, education access (€67M in 2023)</li>
                    <li><strong>WFP:</strong> Food security for displaced populations, emergency response (€45M in 2023)</li>
                    <li><strong>ILO:</strong> Labour migration, skills development, decent work agenda (€23M in 2023)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Geographic Priorities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">4. Geographic Priorities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Historical Focus Regions</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Sub-Saharan Africa</p>
                      <p className="text-sm text-gray-600">Rationale: Migration corridors to Europe, conflict-induced displacement, development partnerships</p>
                      <p className="text-xs text-gray-500">Key countries: Mali, Niger, Chad, Ethiopia, Somalia, Nigeria</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Middle East & North Africa</p>
                      <p className="text-sm text-gray-600">Rationale: Syrian crisis response, Libya migration routes, regional stability</p>
                      <p className="text-xs text-gray-500">Key countries: Syria, Lebanon, Jordan, Libya, Tunisia, Morocco</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Western Balkans</p>
                      <p className="text-sm text-gray-600">Rationale: EU accession pathway, migration route management, regional cooperation</p>
                      <p className="text-xs text-gray-500">Key countries: Serbia, Bosnia and Herzegovina, North Macedonia, Albania</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Eastern Partnership</p>
                      <p className="text-sm text-gray-600">Rationale: EU neighborhood policy, conflict-affected areas, migration partnerships</p>
                      <p className="text-xs text-gray-500">Key countries: Ukraine, Moldova, Georgia, Armenia</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Emerging Geographic Focus</h4>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium">Small Island Developing States (SIDS)</p>
                      <p className="text-sm text-green-600">Climate resilience, planned relocation, adaptation financing</p>
                      <p className="text-xs text-green-500">Pacific Islands, Caribbean states, Indian Ocean islands</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium">Central Asia</p>
                      <p className="text-sm text-green-600">Labour migration corridors, regional cooperation, connectivity</p>
                      <p className="text-xs text-green-500">Kazakhstan, Uzbekistan, Kyrgyzstan, Tajikistan</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="font-medium">Latin America</p>
                      <p className="text-sm text-green-600">Venezuelan displacement, climate migration, development cooperation</p>
                      <p className="text-xs text-green-500">Colombia, Peru, Ecuador, Central America</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">IOM Regional Strategy Alignment</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Africa:</strong> Strong alignment with IOM's Regional Strategy for Africa on displacement and development</li>
                    <li><strong>Middle East:</strong> Joint priorities on crisis response and stabilization in Syria, Iraq, Yemen</li>
                    <li><strong>Europe:</strong> Coordination on intra-EU mobility and external border management</li>
                    <li><strong>Asia-Pacific:</strong> Growing engagement on climate mobility and disaster risk reduction</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Decision-Making */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">5. Decision-Making Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Decision-Makers</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">European Commission</p>
                      <p className="text-sm text-gray-600">DG INTPA Director-General, DG HOME Director-General, DG ECHO Director-General</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">Council of the European Union</p>
                      <p className="text-sm text-gray-600">Foreign Affairs Council, Justice and Home Affairs Council</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">European Parliament</p>
                      <p className="text-sm text-gray-600">Committee on Development (DEVE), Committee on Civil Liberties (LIBE)</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">EU Delegations</p>
                      <p className="text-sm text-gray-600">Country-level programming and implementation oversight</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Approval Process</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <p className="text-gray-700">Annual Action Programmes and Multi-Annual Indicative Programmes</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <p className="text-gray-700">Calls for Proposals (restricted and open procedures)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <p className="text-gray-700">Direct awards to UN agencies (Framework Partnership Agreements)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <p className="text-gray-700">Bilateral negotiations for strategic partnerships</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Evaluation Criteria</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Mandatory Requirements</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Gender equality and women's empowerment (minimum 85% gender marker)</li>
                        <li>Climate and environment mainstreaming (30% climate marker)</li>
                        <li>Human rights-based approach</li>
                        <li>Do No Harm principles</li>
                        <li>Conflict sensitivity analysis</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 mb-2">Preferred Approaches</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Multi-stakeholder partnerships</li>
                        <li>Innovation and digital solutions</li>
                        <li>Evidence-based programming</li>
                        <li>Capacity building and local ownership</li>
                        <li>Results-based monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Design */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">6. Proposal Design Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Keywords to Use</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'resilience', 'co-creation', 'green innovation', 'digital inclusion', 'nexus approach',
                      'transformative', 'sustainable', 'evidence-based', 'participatory', 'inclusive',
                      'climate-smart', 'conflict-sensitive', 'rights-based', 'capacity building',
                      'local ownership', 'partnership', 'innovation', 'scalable', 'replicable'
                    ].map((keyword, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Keywords to Avoid</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'support', 'development work', 'assistance', 'help', 'aid',
                      'basic', 'simple', 'traditional', 'standard', 'conventional',
                      'short-term', 'temporary', 'emergency-only'
                    ].map((keyword, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Typical Budget Ranges</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="font-bold text-blue-800 text-lg">€250K - €500K</p>
                      <p className="text-sm text-blue-600">Pilot projects, innovation</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="font-bold text-blue-800 text-lg">€500K - €2M</p>
                      <p className="text-sm text-blue-600">Standard programming</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="font-bold text-blue-800 text-lg">€2M - €10M</p>
                      <p className="text-sm text-blue-600">Strategic partnerships</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Proposal Success Factors</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Clear Theory of Change:</strong> Logical linkage between activities, outcomes, and impact</li>
                    <li><strong>Strong Partnerships:</strong> Government, civil society, private sector, and academic engagement</li>
                    <li><strong>Innovation Component:</strong> Technology, methodology, or approach innovation</li>
                    <li><strong>Sustainability Plan:</strong> Clear pathway to long-term sustainability and local ownership</li>
                    <li><strong>Results Framework:</strong> SMART indicators with baseline and target data</li>
                    <li><strong>Risk Management:</strong> Comprehensive risk analysis with mitigation strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Profile
              </Button>
              <Button variant="outline">
                <FileEdit className="w-4 h-4 mr-2" />
                Generate Proposal Template
              </Button>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Find Similar Donors
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'donor-scoping-results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('donor-scoping-form')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Scoping Results</h1>
            <p className="text-gray-600">Found 12 potential donors matching your criteria</p>
          </div>
          
          <div className="space-y-8">
            {/* Multilateral Donors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                Multilateral Donors
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-600">European Union</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Leading donor for migration governance and climate mobility initiatives in Southeast Asia.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate migration, digital identity, border management</div>
                      <div><strong>Geographic Priority:</strong> ASEAN countries, climate-vulnerable regions</div>
                      <div><strong>Budget Range:</strong> €500K - €5M</div>
                      <div><strong>Application Cycle:</strong> Annual calls (March-May)</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-600">World Bank Group</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Climate resilience and disaster risk reduction funding through multiple trust funds.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate adaptation, disaster preparedness, urban resilience</div>
                      <div><strong>Geographic Priority:</strong> Pacific Islands, Southeast Asia, South Asia</div>
                      <div><strong>Budget Range:</strong> $200K - $3M</div>
                      <div><strong>Application Cycle:</strong> Rolling basis, quarterly reviews</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-600">Asian Development Bank</CardTitle>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Regional development bank with strong focus on climate resilience and sustainable development.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate finance, regional cooperation, sustainable cities</div>
                      <div><strong>Geographic Priority:</strong> Asia-Pacific region, SIDS</div>
                      <div><strong>Budget Range:</strong> $300K - $2M</div>
                      <div><strong>Application Cycle:</strong> Country partnership strategies</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-600">Green Climate Fund</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Dedicated climate finance mechanism supporting adaptation and mitigation projects.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate adaptation, ecosystem resilience, early warning systems</div>
                      <div><strong>Geographic Priority:</strong> Developing countries, SIDS, LDCs</div>
                      <div><strong>Budget Range:</strong> $1M - $10M</div>
                      <div><strong>Application Cycle:</strong> Continuous, board meetings quarterly</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bilateral Donors */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">5</span>
                </div>
                Bilateral Donors
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-green-600">Germany (GIZ/BMZ)</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Strong focus on climate migration and sustainable development cooperation.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate migration, green technology, capacity building</div>
                      <div><strong>Geographic Priority:</strong> Asia-Pacific, Africa, partner countries</div>
                      <div><strong>Budget Range:</strong> €200K - €2M</div>
                      <div><strong>Application Cycle:</strong> Annual programming, bilateral negotiations</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-green-600">Japan (JICA)</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Regional leader in disaster risk reduction and climate adaptation financing.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Disaster preparedness, climate adaptation, regional cooperation</div>
                      <div><strong>Geographic Priority:</strong> Asia-Pacific, Pacific Islands</div>
                      <div><strong>Budget Range:</strong> $300K - $3M</div>
                      <div><strong>Application Cycle:</strong> Country assistance strategies</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-green-600">Australia (DFAT)</CardTitle>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">High Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Pacific-focused development cooperation with emphasis on climate resilience.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Pacific partnerships, climate resilience, migration governance</div>
                      <div><strong>Geographic Priority:</strong> Pacific Islands, Southeast Asia</div>
                      <div><strong>Budget Range:</strong> AUD 250K - AUD 2M</div>
                      <div><strong>Application Cycle:</strong> Aid investment plans, direct partnerships</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-green-600">Norway (Norad)</CardTitle>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Climate and environment focus with innovative financing mechanisms.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Climate finance, ocean conservation, renewable energy</div>
                      <div><strong>Geographic Priority:</strong> Global South, SIDS, Arctic regions</div>
                      <div><strong>Budget Range:</strong> NOK 2M - NOK 15M</div>
                      <div><strong>Application Cycle:</strong> Thematic calls, strategic partnerships</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-green-600">Canada (GAC)</CardTitle>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Medium Match</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Feminist international assistance with climate and migration focus.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Gender equality, climate action, humanitarian assistance</div>
                      <div><strong>Geographic Priority:</strong> Fragile states, climate-vulnerable countries</div>
                      <div><strong>Budget Range:</strong> CAD 200K - CAD 2M</div>
                      <div><strong>Application Cycle:</strong> Calls for proposals, partnership agreements</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">View Profile</Button>
                      <Button size="sm" variant="outline">Contact Info</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Private Sector Partners */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                Private Sector Partners
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-purple-600">Microsoft Climate Innovation Fund</CardTitle>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Tech Partner</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Technology solutions for climate adaptation and digital resilience initiatives.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> AI for climate, digital infrastructure, data analytics</div>
                      <div><strong>Partnership Type:</strong> Technology grants, capacity building, cloud credits</div>
                      <div><strong>Value Range:</strong> $50K - $500K (in-kind + cash)</div>
                      <div><strong>Application:</strong> Quarterly innovation challenges</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">View Profile</Button>
                      <Button size="sm" variant="outline">Partnership Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-purple-600">Mastercard Center for Inclusive Growth</CardTitle>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Financial Partner</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Financial inclusion and digital identity solutions for displaced populations.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Digital payments, financial inclusion, identity verification</div>
                      <div><strong>Partnership Type:</strong> Co-funding, technology platform, expertise</div>
                      <div><strong>Value Range:</strong> $100K - $1M</div>
                      <div><strong>Application:</strong> Strategic partnership proposals</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">View Profile</Button>
                      <Button size="sm" variant="outline">Partnership Info</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-purple-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-purple-600">IKEA Foundation</CardTitle>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Foundation</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">Renewable energy and sustainable livelihoods for displaced communities.</p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Focus Areas:</strong> Renewable energy, sustainable livelihoods, refugee support</div>
                      <div><strong>Partnership Type:</strong> Grant funding, capacity building</div>
                      <div><strong>Value Range:</strong> €200K - €2M</div>
                      <div><strong>Application:</strong> Annual grant cycles, strategic partnerships</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">View Profile</Button>
                      <Button size="sm" variant="outline">Partnership Info</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <Button className="bg-blue-400 hover:bg-blue-500">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline">
                <FileEdit className="w-4 h-4 mr-2" />
                Create Funding Strategy
              </Button>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Refine Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'develop-proposal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('proposal-development')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Proposal Development
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileEdit className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Develop a Proposal</h1>
            <p className="text-gray-600">Choose your approach for results-matrix support</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Build Results Matrix */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <FileEdit className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-600">Get Support with Building the Results-Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Upload your documents and get AI assistance to build a comprehensive results-matrix from scratch</p>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => setCurrentView('build-matrix-form')}
                >
                  Build Results-Matrix
                </Button>
              </CardContent>
            </Card>

            {/* Review Results Matrix */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-blue-600">Get Support with Reviewing and Improving a Results-Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Upload your existing results-matrix and get expert feedback and improvement suggestions</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentView('review-matrix-form')}
                >
                  Review Results-Matrix
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">AI Amplified IOM Project Cycle - Proposal Development Phase</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'build-matrix-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('develop-proposal')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Develop Proposal
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileEdit className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Build Results-Matrix</CardTitle>
              <p className="text-gray-600">Upload your documents and provide additional information to build a comprehensive results-matrix</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Document Upload Section */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Upload Documents *
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload research, concept notes, donor intelligence, meeting notes, and other relevant documents</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleBuildMatrixFileUpload}
                    className="hidden"
                    id="build-matrix-file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                  />
                  <label htmlFor="build-matrix-file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</p>
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {buildMatrixData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {buildMatrixData.documents.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBuildMatrixFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Additional Information */}
              <div>
                <Label htmlFor="buildAdditionalInfo" className="text-sm font-medium text-gray-700">
                  Additional Information
                </Label>
                <p className="text-xs text-gray-500 mb-2">Provide any additional context, requirements, or specific guidance for building the results-matrix</p>
                <Textarea
                  id="buildAdditionalInfo"
                  placeholder="Enter any additional information that would help in building the results-matrix..."
                  value={buildMatrixData.additionalInfo}
                  onChange={(e) => handleBuildMatrixChange('additionalInfo', e.target.value)}
                  className="mt-1"
                  rows={6}
                />
              </div>
              
              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-3"
                onClick={() => setCurrentView('results-matrix')}
              >
                Build Results-Matrix
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'review-matrix-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('develop-proposal')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Develop Proposal
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Review and Improve Results-Matrix</CardTitle>
              <p className="text-gray-600">Upload your existing results-matrix and get expert feedback and improvement suggestions</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Matrix Document Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Upload Existing Results-Matrix *
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload your current results-matrix document for review and improvement</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleMatrixDocumentUpload}
                    className="hidden"
                    id="matrix-document-upload"
                    accept=".pdf,.doc,.docx,.xlsx,.xls"
                  />
                  <label htmlFor="matrix-document-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload your results-matrix</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, XLS, XLSX</p>
                  </label>
                </div>
                
                {/* Uploaded Matrix Document */}
                {reviewMatrixData.matrixDocument && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Results-Matrix:</p>
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{reviewMatrixData.matrixDocument.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(reviewMatrixData.matrixDocument.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeMatrixDocument}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Additional Documents */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Additional Supporting Documents
                </Label>
                <p className="text-xs text-gray-500 mb-3">Upload any additional documents that provide context (optional)</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleReviewMatrixFileUpload}
                    className="hidden"
                    id="review-matrix-file-upload"
                    accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx"
                  />
                  <label htmlFor="review-matrix-file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload additional files</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX</p>
                  </label>
                </div>
                
                {/* Additional Files List */}
                {reviewMatrixData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Additional Files:</p>
                    {reviewMatrixData.documents.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReviewMatrixFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Additional Information */}
              <div>
                <Label htmlFor="reviewAdditionalInfo" className="text-sm font-medium text-gray-700">
                  Additional Information
                </Label>
                <p className="text-xs text-gray-500 mb-2">Provide specific areas you'd like feedback on or any particular concerns about your results-matrix</p>
                <Textarea
                  id="reviewAdditionalInfo"
                  placeholder="Enter any specific feedback areas, concerns, or requirements for reviewing your results-matrix..."
                  value={reviewMatrixData.additionalInfo}
                  onChange={(e) => handleReviewMatrixChange('additionalInfo', e.target.value)}
                  className="mt-1"
                  rows={6}
                />
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                disabled={!reviewMatrixData.matrixDocument}
              >
                Review Results-Matrix
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'results-matrix') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('build-matrix-form')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileEdit className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Results Matrix</CardTitle>
              <p className="text-gray-600">Edit any section according to your project needs</p>
            </CardHeader>
            <CardContent>
              {/* Results Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6"></th>
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6">Indicators</th>
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6">Data Source and Collection Method</th>
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6">Baseline</th>
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6">Target</th>
                      <th className="border border-gray-400 p-2 text-left font-medium w-1/6">Assumptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Objective Row */}
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-medium">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm font-medium"
                          rows={8}
                          defaultValue="Objective: Contribute to addressing the humanitarian and housing needs of vulnerable refugees from Ukraine by fostering access to immediate safe and dignified accommodation while facilitating their self-reliance."
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="% of refugees in collective shelters reporting improved living conditions"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={4}
                          defaultValue="% of beneficiaries who report improved self-reliance as a result of IOM interventions"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="Feedback and beneficiary satisfaction surveys"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="0"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="0"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="70%"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="70%"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={8}
                          defaultValue=""
                        />
                      </td>
                    </tr>
                    
                    {/* Outcome 1 Row */}
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-medium">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm font-medium"
                          rows={6}
                          defaultValue="Outcome 1: Target populations have access to the essential services and assistance based on needs (SRF)"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="# of persons reached directly by IOM crisis programming (disaggregated by sex, age, vulnerability) (SRF)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={6}
                          defaultValue="% of beneficiaries reporting that humanitarian assistance is delivered in a safe, accessible, accountable and participatory manner. (SRF 1a1a)"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="Programme records"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="37,604"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="0%"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="37,974 (+ 370, 220 female, 150 male – exact disaggregation to be determined)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="70%"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={10}
                          defaultValue="The political and security environment remains relatively stable to enable the implementation of the project and humanitarian interventions, and ensure the achievement of project results."
                        />
                      </td>
                    </tr>
                    
                    {/* Output 1.1 Row */}
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-medium">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm font-medium"
                          rows={6}
                          defaultValue="Output 1.1: Collective shelters housing refugees from Ukraine receive support with a focus on addressing their basic needs"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="# of collective sites, facilities and/or shelters assessed and supported"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={6}
                          defaultValue="# of individuals benefitting from service and/or food and NFI support in collective centers (disaggregated by sex, age, and type of assistance)"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="Programme records"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="17"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="12,487"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="20 (+3)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={4}
                          defaultValue="12607 (+120, 70 female, 50 male exact disaggregation to be determined)"
                        />
                      </td>
                      <td className="border border-gray-400 p-2">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={6}
                          defaultValue="Local counterparts and beneficiaries will allow for the collection of data relevant to the monitoring process"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={4}
                          defaultValue="Collective shelters maintain adequate and sufficient space and capacity to accommodate vulnerable refugees."
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Activities Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Activities that lead to Output 1.1:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <textarea 
                    className="w-full bg-transparent border-none resize-none text-sm"
                    rows={4}
                    defaultValue="1.1.1.: Comprehensive needs assessments in collective shelters/centres
1.1.2.: Provision of financial support in the form of small cash grants to help cover service costs of shelters in need of
1.1.3. Provision of assistance to shelters based on tailored needs, including NFIs and food assistance"
                  />
                </div>
                <div className="mt-2 text-right">
                  <textarea 
                    className="bg-transparent border-none resize-none text-sm text-gray-600"
                    rows={3}
                    defaultValue="Vulnerable beneficiaries will remain in Hungary and in need of shelter support and humanitarian assistance."
                  />
                </div>
              </div>
              
              {/* Output 1.2 Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400 text-sm">
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-2 bg-gray-100 font-medium w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm font-medium"
                          rows={6}
                          defaultValue="Output 1.2: Refugees from Ukraine receive assistance in transitioning from collective shelters to private housing."
                        />
                      </td>
                      <td className="border border-gray-400 p-2 w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="# of persons benefitting from comprehensive case management support"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={6}
                          defaultValue="# of individuals benefitting from housing and/or NFI support directly (disaggregated by sex, age, and type of assistance)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={4}
                          defaultValue="# of persons transitioning from collective shelters to private housing"
                        />
                      </td>
                      <td className="border border-gray-400 p-2 w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={4}
                          defaultValue="Programme records"
                        />
                      </td>
                      <td className="border border-gray-400 p-2 w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="667"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="2,728"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="15"
                        />
                      </td>
                      <td className="border border-gray-400 p-2 w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={2}
                          defaultValue="727 (+60)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={4}
                          defaultValue="2978 (+250, 150 female, 100 male, exact disaggregation to be determined)"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={2}
                          defaultValue="55 (+40)"
                        />
                      </td>
                      <td className="border border-gray-400 p-2 w-1/6">
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm"
                          rows={6}
                          defaultValue="Local counterparts and beneficiaries will allow for the collection of data relevant to the monitoring process"
                        />
                        <br />
                        <textarea 
                          className="w-full bg-transparent border-none resize-none text-sm mt-2"
                          rows={6}
                          defaultValue="The local rental market is sufficient and open to accommodate vulnerable beneficiaries and ensure suitable housing options."
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Activities Section 1.2 */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Activities that lead to Output 1.2:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <textarea 
                    className="w-full bg-transparent border-none resize-none text-sm"
                    rows={6}
                    defaultValue="1.2.1.: Conducting needs assessments to identify needs and challenges for those receiving case management and assistance
1.2.2.: Provision of comprehensive case management support, including rental assistance, labour market counselling and referrals for vulnerable cases.
1.2.3.: Supporting households with vital non-food items, including household goods and appliances to ensure dignified housing conditions."
                  />
                </div>
                <div className="mt-2 text-right">
                  <textarea 
                    className="bg-transparent border-none resize-none text-sm text-gray-600"
                    rows={4}
                    defaultValue="Vulnerable beneficiaries will remain in Hungary and in need of assistance to transition to private housing.

Beneficiaries demonstrate willingness to transition to private housing and improve self-reliance."
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-8">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={downloadResultsMatrix}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentView('full-proposal')}
                >
                  <FileEdit className="w-4 h-4 mr-2" />
                  Develop Full Proposal
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => setCurrentView('search-form')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Similar Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'endorsement') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project Cycle
          </Button>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Endorsement</h1>
            <p className="text-gray-600">Do you want to...</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Thematic Review */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-teal-600">Thematic Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get comprehensive thematic review and technical assessment of your project proposal</p>
                <Button className="w-full bg-teal-500 hover:bg-teal-600">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Review for IOM Development Fund */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-3">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-teal-600">Review for IOM Development Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Submit your proposal for IOM Development Fund review and approval process</p>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Quality Check for EU Funding */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-teal-600">Quality & Compliance Check for EU Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Comprehensive quality and compliance assessment for European Union funding requirements</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Prompts for Compliance and Quality */}
            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg text-teal-600">Prompts for Compliance and Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Access guided prompts and checklists for compliance and quality assurance</p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">AI Amplified IOM Project Cycle - Project Endorsement Phase</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'search-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => setCurrentView('conceptualization')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Conceptualization
          </Button>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Find Existing Concept Note</CardTitle>
              <p className="text-gray-600">Search through concept notes, active projects, and completed projects</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="keywords" className="text-sm font-medium text-gray-700">
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords to search for"
                  value={searchData.keywords}
                  onChange={(e) => handleSearchChange('keywords', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="benefittingCountry" className="text-sm font-medium text-gray-700">
                  Benefitting Country/Region
                </Label>
                <Input
                  id="benefittingCountry"
                  placeholder="Enter country or region"
                  value={searchData.benefittingCountry}
                  onChange={(e) => handleSearchChange('benefittingCountry', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="donor" className="text-sm font-medium text-gray-700">
                  Donor
                </Label>
                <Input
                  id="donor"
                  placeholder="Enter donor organization"
                  value={searchData.donor}
                  onChange={(e) => handleSearchChange('donor', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="searchThematicArea" className="text-sm font-medium text-gray-700">
                  Thematic Area
                </Label>
                <Input
                  id="searchThematicArea"
                  placeholder="e.g., child protection, labour mobility"
                  value={searchData.thematicArea}
                  onChange={(e) => handleSearchChange('thematicArea', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Search In
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="conceptNotes"
                      checked={searchData.conceptNotes}
                      onChange={(e) => handleCheckboxChange('conceptNotes', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="conceptNotes" className="text-sm text-gray-700">
                      Concept Notes
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="activeProjects"
                      checked={searchData.activeProjects}
                      onChange={(e) => handleCheckboxChange('activeProjects', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="activeProjects" className="text-sm text-gray-700">
                      Endorsed/Active Projects
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="completedProjects"
                      checked={searchData.completedProjects}
                      onChange={(e) => handleCheckboxChange('completedProjects', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Label htmlFor="completedProjects" className="text-sm text-gray-700">
                      Completed Projects
                    </Label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                onClick={performSearch}
                disabled={isSearching || (!searchData.conceptNotes && !searchData.activeProjects && !searchData.completedProjects)}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'search-results') {
    // Mock data for search results
    const mockConceptNotes = [
      {
        id: 1,
        title: "Enhanced Protection Services for Vulnerable Migrants",
        description: "Comprehensive protection framework addressing the needs of migrants in transit and destination countries through strengthened institutional capacity and community-based approaches.",
        benefittingCountry: "Bangladesh, Thailand",
        thematicArea: "Protection and Assistance",
        developedBy: "IOM Regional Office Bangkok",
        date: "2024-03-15"
      },
      {
        id: 2,
        title: "Labour Mobility and Skills Development Initiative",
        description: "Multi-country initiative to enhance labour mobility pathways while ensuring protection of migrant workers' rights and promoting skills development.",
        benefittingCountry: "Philippines, Malaysia, Singapore",
        thematicArea: "Labour Mobility",
        developedBy: "IOM Philippines",
        date: "2024-02-28"
      },
      {
        id: 3,
        title: "Climate-Induced Migration Response Framework",
        description: "Innovative approach to address displacement caused by climate change through early warning systems and planned relocation strategies.",
        benefittingCountry: "Pacific Island States",
        thematicArea: "Climate Migration",
        developedBy: "IOM Regional Office Fiji",
        date: "2024-01-20"
      }
    ]

    const mockActiveProjects = [
      {
        id: 1,
        title: "Strengthening Border Management Capacity",
        description: "Ongoing project to enhance border management systems and procedures while ensuring protection of migrants' rights at border crossings.",
        benefittingCountry: "Myanmar, Bangladesh",
        thematicArea: "Border Management",
        developedBy: "IOM Myanmar",
        date: "2023-09-10"
      },
      {
        id: 2,
        title: "Integration Support for Urban Migrants",
        description: "Active implementation of integration services including language training, vocational skills, and community engagement programs.",
        benefittingCountry: "Indonesia, Malaysia",
        thematicArea: "Integration",
        developedBy: "IOM Indonesia",
        date: "2023-11-05"
      }
    ]

    const mockCompletedProjects = [
      {
        id: 1,
        title: "Emergency Response to Displacement Crisis",
        description: "Successfully completed emergency response providing shelter, food, and medical assistance to displaced populations during humanitarian crisis.",
        benefittingCountry: "Afghanistan, Pakistan",
        thematicArea: "Emergency Response",
        developedBy: "IOM Afghanistan",
        date: "2023-06-30"
      },
      {
        id: 2,
        title: "Counter-Trafficking Capacity Building Program",
        description: "Completed comprehensive training program for law enforcement and civil society on identification and assistance of trafficking victims.",
        benefittingCountry: "Vietnam, Cambodia, Laos",
        thematicArea: "Counter-Trafficking",
        developedBy: "IOM Vietnam",
        date: "2023-08-15"
      },
      {
        id: 3,
        title: "Diaspora Engagement for Development",
        description: "Successful completion of diaspora mapping and engagement initiative connecting overseas communities with development projects in origin countries.",
        benefittingCountry: "Sri Lanka, India",
        thematicArea: "Diaspora Engagement",
        developedBy: "IOM Sri Lanka",
        date: "2023-04-22"
      }
    ]

    const ProjectCard = ({ project, type }) => (
      <Card className="hover:shadow-lg transition-shadow mb-4">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">{project.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              type === 'concept' ? 'bg-blue-100 text-blue-800' :
              type === 'active' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {type === 'concept' ? 'Concept Note' : type === 'active' ? 'Active' : 'Completed'}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Benefitting Country:</span>
              <p className="text-gray-600">{project.benefittingCountry}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Thematic Area:</span>
              <p className="text-gray-600">{project.thematicArea}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Developed By:</span>
              <p className="text-gray-600">{project.developedBy}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <p className="text-gray-600">{new Date(project.date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button variant="outline" size="sm" className="mr-2">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </div>
        </CardContent>
      </Card>
    )

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="outline"
              onClick={() => setCurrentView('search-form')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600">Found {mockConceptNotes.length + mockActiveProjects.length + mockCompletedProjects.length} results</p>
            </div>
            
            <Button 
              variant="outline"
              onClick={() => setCurrentView('search-form')}
            >
              New Search
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Concept Notes Section */}
            {searchData.conceptNotes && (
              <div>
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Concept Notes</h2>
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {mockConceptNotes.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {mockConceptNotes.map(project => (
                    <ProjectCard key={project.id} project={project} type="concept" />
                  ))}
                </div>
              </div>
            )}

            {/* Active Projects Section */}
            {searchData.activeProjects && (
              <div>
                <div className="flex items-center mb-4">
                  <Database className="w-5 h-5 text-green-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {mockActiveProjects.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {mockActiveProjects.map(project => (
                    <ProjectCard key={project.id} project={project} type="active" />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Projects Section */}
            {searchData.completedProjects && (
              <div>
                <div className="flex items-center mb-4">
                  <FileEdit className="w-5 h-5 text-gray-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Completed Projects</h2>
                  <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                    {mockCompletedProjects.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {mockCompletedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} type="completed" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* No results message */}
          {!searchData.conceptNotes && !searchData.activeProjects && !searchData.completedProjects && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No search categories selected</h3>
              <p className="text-gray-600">Please select at least one category to search in.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

    // Full Proposal Page
    if (currentView === 'full-proposal') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
          <div className="max-w-6xl mx-auto">
            <Button 
              onClick={() => setCurrentView('results-matrix')}
              className="mb-6 bg-green-600 hover:bg-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results Matrix
            </Button>

            <Card className="shadow-lg">
              <CardHeader className="bg-blue-600 text-white">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Full Project Proposal</CardTitle>
                    <p className="text-blue-100 mt-1">Edit any section according to your project needs</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 space-y-8">
                {/* Project Header Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4 text-blue-800">Project Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Project Title</Label>
                      <Textarea 
                        className="mt-1 min-h-[80px]"
                        defaultValue="CONTRIBUTE TO ADDRESSING THE HUMANITARIAN AND HOUSING NEEDS OF VULNERABLE REFUGEES FROM UKRAINE BY FOSTERING ACCESS TO IMMEDIATE SAFE AND DIGNIFIED ACCOMMODATION WHILE FACILITATING SELF-RELIANCE"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Project Type</Label>
                        <Input defaultValue="SN - Emergency Shelter and Settlements" />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Secondary Project Type</Label>
                        <Input defaultValue="PX - Protection and Assistance to Vulnerable Migrants" />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Geographical Coverage</Label>
                        <Input defaultValue="Hungary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Executing Agency</Label>
                      <Input defaultValue="International Organization for Migration (IOM)" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Beneficiaries</Label>
                      <Input defaultValue="370 refugees (220 female, 150 male) from Ukraine in Hungary" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Duration</Label>
                      <Input defaultValue="February 2025 – February 2026 (12 months)" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Budget</Label>
                      <Input defaultValue="USD 178,748" />
                    </div>
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Management Site</Label>
                      <Input defaultValue="Vienna, RO, AUSTRIA" />
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div>
                  <h2 className="text-xl font-bold mb-4 text-blue-800">Summary</h2>
                  <Textarea 
                    className="min-h-[200px]"
                    defaultValue="The ongoing war in Ukraine has led to a major humanitarian crisis, leading to the displacement of thousands of refugees seeking refuge and support in Hungary. In response to the newly imposed restrictions coming into force in August 2024 related to state-subsidized housing support for refugees from Ukraine, IOM Hungary seeks to launch a multi-sectoral intervention that does not only address urgent humanitarian needs but also aligns with the Humanitarian-Development-Peace Nexus (HDPN) to ensure sustainable outcomes."
                  />
                </div>

                {/* Rationale Section */}
                <div>
                  <h2 className="text-xl font-bold mb-4 text-blue-800">1. Rationale</h2>
                  <Textarea 
                    className="min-h-[300px]"
                    defaultValue="The full-scale invasion of Ukraine by the Russian Federation on 24 February 2022 has triggered the largest humanitarian crisis in Europe since World War II. According to the Regional Refugee Response Plan (2024), approximately 85,000 individuals sought safety in Hungary in 2024, with around 40,000 requiring protection-related support."
                  />
                </div>

                {/* Project Description Section */}
                <div>
                  <h2 className="text-xl font-bold mb-4 text-blue-800">2. Project Description</h2>
                  <Textarea 
                    className="min-h-[300px]"
                    defaultValue="To address the complex and urgent needs identified, IOM employs a layered and gradual intervention strategy. This evidence-informed approach draws on insights from various assessments, including a shelter mapping coordinated by UNHCR, as well as consultations held by IOM with local actors and publicly funded shelters."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-8 border-t">
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      // Download functionality for full proposal
                      const proposalContent = document.querySelectorAll('textarea');
                      let content = '# Full Project Proposal\n\n';
                      
                      // Extract content from all textareas
                      proposalContent.forEach((textarea, index) => {
                        if (textarea.value.trim()) {
                          content += textarea.value + '\n\n';
                        }
                      });
                      
                      const blob = new Blob([content], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'full-proposal.md';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Database className="w-4 h-4 mr-2" />
                    Develop Budget
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setCurrentView('search-form')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search Similar Projects
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <FileEdit className="w-4 h-4 mr-2" />
                    Move to Quality & Compliance Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    // Default return for other views
    return null;
  }

export default App

