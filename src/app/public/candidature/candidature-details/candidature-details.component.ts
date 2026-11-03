import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"

interface JobOffer {
  id: number
  title: string
  company: string
  location: string
  type: string
  description: string
  requirements: string[]
  salary: string
}

interface FileUpload {
  file: File | null
  preview: string | null
  error: string | null
}

@Component({
  selector: "app-candidature-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./candidature-details.component.html",
  styleUrls: ["./candidature-details.component.scss"],
})
export class CandidatureDetailsComponent implements OnInit {
  currentStep = 1
  totalSteps = 4
  candidatureForm!: FormGroup

  jobOffer: JobOffer = {
    id: 1,
    title: "Développeur Full Stack Senior",
    company: "TechCorp Innovation",
    location: "Dakar, Sénégal",
    type: "CDI",
    description: "Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe basée à Dakar.",
    requirements: [
      "5+ ans d'expérience en développement web",
      "Maîtrise de Angular, React ou Vue.js",
      "Expérience avec Node.js et bases de données",
      "Excellentes compétences en communication",
    ],
    salary: "1 500 000 - 2 500 000 FCFA / mois",
  }

  cvFile: FileUpload = { file: null, preview: null, error: null }
  coverLetterFile: FileUpload = { file: null, preview: null, error: null }
  diplomaFiles: FileUpload[] = []

  // 🎓 Système sénégalais
  educationLevels = [
    "BFEM",
    "Baccalauréat",
    "BTS / DUT",
    "Licence",
    "Master",
    "Doctorat",
    "Autre",
  ]

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.candidatureForm = new FormGroup({
      // Step 1: Informations personnelles
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^7[05678][0-9]{7}$/), // Ex: 771234567
      ]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{5}$/),
      ]),
      country: new FormControl('Sénégal', Validators.required),

      // Step 2: Parcours académique et expérience
      educationLevel: new FormControl('', Validators.required),
      diploma: new FormControl('', Validators.required),
      institution: new FormControl('', Validators.required),
      graduationYear: new FormControl('', [
        Validators.required,
        Validators.min(1960),
        Validators.max(new Date().getFullYear()),
      ]),
      yearsExperience: new FormControl('', [Validators.required, Validators.min(0)]),
      currentPosition: new FormControl(''),
      skills: new FormControl('', Validators.required),

      // Step 3: Documents (gérés séparément)

      // Step 4: Finalisation
      motivation: new FormControl('', [Validators.minLength(100)]),
      availability: new FormControl('', Validators.required),
      consent: new FormControl(false, Validators.requiredTrue),
    });
  }

  get progressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  validateCurrentStep(): boolean {
    let fieldsToValidate: string[] = []

    switch (this.currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode", "country"]
        break
      case 2:
        fieldsToValidate = ["educationLevel", "diploma", "institution", "graduationYear", "yearsExperience", "skills"]
        break
      case 3:
        return this.cvFile.file !== null && this.coverLetterFile.file !== null
      case 4:
        fieldsToValidate = ["motivation", "availability", "consent"]
        break
    }

    fieldsToValidate.forEach((field) => {
      this.candidatureForm.get(field)?.markAsTouched()
    })

    return fieldsToValidate.every((field) => this.candidatureForm.get(field)?.valid)
  }

  onFileSelect(event: Event, type: "cv" | "coverLetter" | "diploma"): void {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return

    const file = input.files[0]
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (file.size > maxSize) {
      this.setFileError(type, "Le fichier ne doit pas dépasser 5 Mo")
      return
    }

    if (!allowedTypes.includes(file.type)) {
      this.setFileError(type, "Format non supporté. Utilisez PDF ou Word.")
      return
    }

    const fileUpload: FileUpload = {
      file,
      preview: file.name,
      error: null,
    }

    if (type === "cv") this.cvFile = fileUpload
    else if (type === "coverLetter") this.coverLetterFile = fileUpload
    else if (type === "diploma") this.diplomaFiles.push(fileUpload)
  }

  setFileError(type: "cv" | "coverLetter" | "diploma", error: string): void {
    if (type === "cv") this.cvFile.error = error
    else if (type === "coverLetter") this.coverLetterFile.error = error
  }

  removeFile(type: "cv" | "coverLetter" | "diploma", index?: number): void {
    if (type === "cv") this.cvFile = { file: null, preview: null, error: null }
    else if (type === "coverLetter") this.coverLetterFile = { file: null, preview: null, error: null }
    else if (type === "diploma" && index !== undefined) this.diplomaFiles.splice(index, 1)
  }

  onSubmit(): void {
    if (this.candidatureForm.valid && this.cvFile.file && this.coverLetterFile.file) {
      const formData = new FormData()

      Object.keys(this.candidatureForm.value).forEach((key) => {
        formData.append(key, this.candidatureForm.value[key])
      })

      if (this.cvFile.file) formData.append("cv", this.cvFile.file)
      if (this.coverLetterFile.file) formData.append("coverLetter", this.coverLetterFile.file)
      this.diplomaFiles.forEach((diploma, index) => {
        if (diploma.file) formData.append(`diploma${index}`, diploma.file)
      })

      console.log("Formulaire soumis :", this.candidatureForm.value)
      alert("Votre candidature a été soumise avec succès !")
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.candidatureForm.get(fieldName)
    if (field?.hasError("required")) return "Ce champ est requis"
    if (field?.hasError("email")) return "Adresse email invalide"
    if (field?.hasError("minlength")) return `Minimum ${field.errors?.["minlength"].requiredLength} caractères`
    if (field?.hasError("pattern")) return "Format invalide"
    if (field?.hasError("min")) return `Valeur minimale : ${field.errors?.["min"].min}`
    if (field?.hasError("max")) return `Valeur maximale : ${field.errors?.["max"].max}`
    return ""
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.candidatureForm.get(fieldName)
    return !!(field?.invalid && field?.touched)
  }
}
