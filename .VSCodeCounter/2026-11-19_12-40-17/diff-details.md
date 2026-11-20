# Diff Details

Date : 2026-11-19 12:40:17

Directory d:\\Mern stack\\Clinivo2\\Clinivo

Total : 130 files,  92 codes, 3 comments, 83 blanks, all 178 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.env](/backend/.env) | Dotenv | 5 | 0 | 0 | 5 |
| [backend/config/db.js](/backend/config/db.js) | JavaScript | 12 | 0 | 6 | 18 |
| [backend/controllers/admin.auth.controller.js](/backend/controllers/admin.auth.controller.js) | JavaScript | 96 | 9 | 28 | 133 |
| [backend/controllers/admin.staff.controller.js](/backend/controllers/admin.staff.controller.js) | JavaScript | 469 | 15 | 143 | 627 |
| [backend/controllers/clinic.controller.js](/backend/controllers/clinic.controller.js) | JavaScript | 34 | 0 | 20 | 54 |
| [backend/controllers/doctor.controller.js](/backend/controllers/doctor.controller.js) | JavaScript | 20 | 0 | 9 | 29 |
| [backend/controllers/receptionist.controller.js](/backend/controllers/receptionist.controller.js) | JavaScript | 115 | 2 | 32 | 149 |
| [backend/controllers/user.auth.controller.js](/backend/controllers/user.auth.controller.js) | JavaScript | 121 | 5 | 65 | 191 |
| [backend/index.js](/backend/index.js) | JavaScript | 35 | 0 | 9 | 44 |
| [backend/middleware/AuthMiddleware.js](/backend/middleware/AuthMiddleware.js) | JavaScript | 15 | 0 | 5 | 20 |
| [backend/middleware/IsAdmin.js](/backend/middleware/IsAdmin.js) | JavaScript | 8 | 0 | 1 | 9 |
| [backend/models/appointment.schema.js](/backend/models/appointment.schema.js) | JavaScript | 51 | 0 | 13 | 64 |
| [backend/models/clinic.schema.js](/backend/models/clinic.schema.js) | JavaScript | 22 | 0 | 8 | 30 |
| [backend/models/doctor.schema.js](/backend/models/doctor.schema.js) | JavaScript | 39 | 0 | 14 | 53 |
| [backend/models/receptionist.schema.js](/backend/models/receptionist.schema.js) | JavaScript | 33 | 0 | 6 | 39 |
| [backend/models/user.schema.js](/backend/models/user.schema.js) | JavaScript | 28 | 0 | 12 | 40 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | 1,291 | 0 | 1 | 1,292 |
| [backend/package.json](/backend/package.json) | JSON | 22 | 0 | 1 | 23 |
| [backend/routes/admin.route.js](/backend/routes/admin.route.js) | JavaScript | 6 | 2 | 4 | 12 |
| [backend/routes/admin.staff.route.js](/backend/routes/admin.staff.route.js) | JavaScript | 10 | 2 | 6 | 18 |
| [backend/routes/clinic.route.js](/backend/routes/clinic.route.js) | JavaScript | 5 | 0 | 1 | 6 |
| [backend/routes/doctor.route.js](/backend/routes/doctor.route.js) | JavaScript | 4 | 0 | 2 | 6 |
| [backend/routes/receptionist.route.js](/backend/routes/receptionist.route.js) | JavaScript | 6 | 0 | 4 | 10 |
| [backend/routes/user.auth.route.js](/backend/routes/user.auth.route.js) | JavaScript | 9 | 0 | 2 | 11 |
| [backend/utils/Generate\_Token.js](/backend/utils/Generate_Token.js) | JavaScript | 19 | 0 | 9 | 28 |
| [backend/validations/ClinicValidation.js](/backend/validations/ClinicValidation.js) | JavaScript | 12 | 0 | 1 | 13 |
| [backend/validations/DoctorFormValidation.js](/backend/validations/DoctorFormValidation.js) | JavaScript | 30 | 0 | 1 | 31 |
| [backend/validations/authSchema.js](/backend/validations/authSchema.js) | JavaScript | 6 | 1 | 5 | 12 |
| [frontend/.env](/frontend/.env) | Dotenv | 1 | 0 | 0 | 1 |
| [frontend/Pages/Admin/Admin.jsx](/frontend/Pages/Admin/Admin.jsx) | JavaScript JSX | 90 | 7 | 38 | 135 |
| [frontend/Pages/Admin/Pages/Appointments.jsx](/frontend/Pages/Admin/Pages/Appointments.jsx) | JavaScript JSX | 875 | 78 | 260 | 1,213 |
| [frontend/Pages/Admin/Pages/Clinic.jsx](/frontend/Pages/Admin/Pages/Clinic.jsx) | JavaScript JSX | 92 | 0 | 34 | 126 |
| [frontend/Pages/Admin/Pages/Dashboard.jsx](/frontend/Pages/Admin/Pages/Dashboard.jsx) | JavaScript JSX | 420 | 10 | 55 | 485 |
| [frontend/Pages/Admin/Pages/Doctors.jsx](/frontend/Pages/Admin/Pages/Doctors.jsx) | JavaScript JSX | 945 | 48 | 186 | 1,179 |
| [frontend/Pages/Admin/Pages/Receptionists.jsx](/frontend/Pages/Admin/Pages/Receptionists.jsx) | JavaScript JSX | 822 | 74 | 432 | 1,328 |
| [frontend/Pages/Admin/Pages/Signin.jsx](/frontend/Pages/Admin/Pages/Signin.jsx) | JavaScript JSX | 93 | 0 | 30 | 123 |
| [frontend/Pages/Admin/Pages/Signup.jsx](/frontend/Pages/Admin/Pages/Signup.jsx) | JavaScript JSX | 98 | 0 | 31 | 129 |
| [frontend/Pages/Doctor/Doctor.jsx](/frontend/Pages/Doctor/Doctor.jsx) | JavaScript JSX | 896 | 30 | 88 | 1,014 |
| [frontend/Pages/Doctor/Pages/Signin.jsx](/frontend/Pages/Doctor/Pages/Signin.jsx) | JavaScript JSX | 99 | 0 | 28 | 127 |
| [frontend/Pages/Home/Components/DeserveBetter.jsx](/frontend/Pages/Home/Components/DeserveBetter.jsx) | JavaScript JSX | 22 | 0 | 6 | 28 |
| [frontend/Pages/Home/Components/Features.jsx](/frontend/Pages/Home/Components/Features.jsx) | JavaScript JSX | 77 | 1 | 14 | 92 |
| [frontend/Pages/Home/Components/Footer.jsx](/frontend/Pages/Home/Components/Footer.jsx) | JavaScript JSX | 92 | 0 | 23 | 115 |
| [frontend/Pages/Home/Components/HowITWorks.jsx](/frontend/Pages/Home/Components/HowITWorks.jsx) | JavaScript JSX | 53 | 0 | 13 | 66 |
| [frontend/Pages/Home/Components/Pricing.jsx](/frontend/Pages/Home/Components/Pricing.jsx) | JavaScript JSX | 135 | 0 | 11 | 146 |
| [frontend/Pages/Home/Home.jsx](/frontend/Pages/Home/Home.jsx) | JavaScript JSX | 113 | 4 | 31 | 148 |
| [frontend/Pages/Receptionist/Pages/Signin.jsx](/frontend/Pages/Receptionist/Pages/Signin.jsx) | JavaScript JSX | 104 | 0 | 33 | 137 |
| [frontend/Pages/Receptionist/Receptionist.jsx](/frontend/Pages/Receptionist/Receptionist.jsx) | JavaScript JSX | 505 | 28 | 113 | 646 |
| [frontend/Pages/Unauthorized.jsx](/frontend/Pages/Unauthorized.jsx) | JavaScript JSX | 48 | 5 | 17 | 70 |
| [frontend/README.md](/frontend/README.md) | Markdown | 9 | 0 | 8 | 17 |
| [frontend/eslint.config.js](/frontend/eslint.config.js) | JavaScript | 20 | 0 | 2 | 22 |
| [frontend/index.html](/frontend/index.html) | HTML | 12 | 0 | 1 | 13 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 4,554 | 0 | 1 | 4,555 |
| [frontend/package.json](/frontend/package.json) | JSON | 45 | 0 | 1 | 46 |
| [frontend/public/favicon.svg](/frontend/public/favicon.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/public/icons.svg](/frontend/public/icons.svg) | XML | 24 | 0 | 1 | 25 |
| [frontend/services/api.js](/frontend/services/api.js) | JavaScript | 74 | 7 | 27 | 108 |
| [frontend/src/.env](/frontend/src/.env) | Dotenv | 0 | 0 | 1 | 1 |
| [frontend/src/App.css](/frontend/src/App.css) | PostCSS | 0 | 0 | 1 | 1 |
| [frontend/src/App.jsx](/frontend/src/App.jsx) | JavaScript JSX | 69 | 12 | 36 | 117 |
| [frontend/src/Components/ProtectedRoute.jsx](/frontend/src/Components/ProtectedRoute.jsx) | JavaScript JSX | 30 | 4 | 16 | 50 |
| [frontend/src/assets/react.svg](/frontend/src/assets/react.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/assets/vite.svg](/frontend/src/assets/vite.svg) | XML | 1 | 0 | 1 | 2 |
| [frontend/src/index.css](/frontend/src/index.css) | PostCSS | 24 | 0 | 6 | 30 |
| [frontend/src/main.jsx](/frontend/src/main.jsx) | JavaScript JSX | 16 | 0 | 3 | 19 |
| [frontend/src/store/slices/authSlice.js](/frontend/src/store/slices/authSlice.js) | JavaScript | 174 | 7 | 67 | 248 |
| [frontend/src/store/store.js](/frontend/src/store/store.js) | JavaScript | 7 | 0 | 1 | 8 |
| [frontend/vite.config.js](/frontend/vite.config.js) | JavaScript | 9 | 1 | 4 | 14 |
| [d:\\Mern stack\\Clinivo\\backend\\.env](/d:%5CMern%20stack%5CClinivo%5Cbackend%5C.env) | Dotenv | -5 | 0 | 0 | -5 |
| [d:\\Mern stack\\Clinivo\\backend\\config\\db.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cconfig%5Cdb.js) | JavaScript | -12 | 0 | -6 | -18 |
| [d:\\Mern stack\\Clinivo\\backend\\controllers\\admin.auth.controller.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Ccontrollers%5Cadmin.auth.controller.js) | JavaScript | -96 | -9 | -28 | -133 |
| [d:\\Mern stack\\Clinivo\\backend\\controllers\\admin.staff.controller.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Ccontrollers%5Cadmin.staff.controller.js) | JavaScript | -459 | -16 | -143 | -618 |
| [d:\\Mern stack\\Clinivo\\backend\\controllers\\clinic.controller.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Ccontrollers%5Cclinic.controller.js) | JavaScript | -34 | 0 | -20 | -54 |
| [d:\\Mern stack\\Clinivo\\backend\\controllers\\user.auth.controller.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Ccontrollers%5Cuser.auth.controller.js) | JavaScript | -121 | -5 | -65 | -191 |
| [d:\\Mern stack\\Clinivo\\backend\\index.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cindex.js) | JavaScript | -31 | 0 | -11 | -42 |
| [d:\\Mern stack\\Clinivo\\backend\\middleware\\AuthMiddleware.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmiddleware%5CAuthMiddleware.js) | JavaScript | -15 | 0 | -5 | -20 |
| [d:\\Mern stack\\Clinivo\\backend\\middleware\\IsAdmin.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmiddleware%5CIsAdmin.js) | JavaScript | -8 | 0 | -1 | -9 |
| [d:\\Mern stack\\Clinivo\\backend\\models\\clinic.schema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmodels%5Cclinic.schema.js) | JavaScript | -22 | 0 | -8 | -30 |
| [d:\\Mern stack\\Clinivo\\backend\\models\\doctor.schema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmodels%5Cdoctor.schema.js) | JavaScript | -34 | 0 | -13 | -47 |
| [d:\\Mern stack\\Clinivo\\backend\\models\\patient.schema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmodels%5Cpatient.schema.js) | JavaScript | -35 | 0 | -9 | -44 |
| [d:\\Mern stack\\Clinivo\\backend\\models\\receptionist.schema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmodels%5Creceptionist.schema.js) | JavaScript | -28 | 0 | -6 | -34 |
| [d:\\Mern stack\\Clinivo\\backend\\models\\user.schema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cmodels%5Cuser.schema.js) | JavaScript | -28 | 0 | -12 | -40 |
| [d:\\Mern stack\\Clinivo\\backend\\package-lock.json](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cpackage-lock.json) | JSON | -1,291 | 0 | -1 | -1,292 |
| [d:\\Mern stack\\Clinivo\\backend\\package.json](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cpackage.json) | JSON | -22 | 0 | -1 | -23 |
| [d:\\Mern stack\\Clinivo\\backend\\routes\\admin.route.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Croutes%5Cadmin.route.js) | JavaScript | -6 | -2 | -4 | -12 |
| [d:\\Mern stack\\Clinivo\\backend\\routes\\admin.staff.route.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Croutes%5Cadmin.staff.route.js) | JavaScript | -10 | -2 | -6 | -18 |
| [d:\\Mern stack\\Clinivo\\backend\\routes\\clinic.route.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Croutes%5Cclinic.route.js) | JavaScript | -5 | 0 | -1 | -6 |
| [d:\\Mern stack\\Clinivo\\backend\\routes\\user.auth.route.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Croutes%5Cuser.auth.route.js) | JavaScript | -9 | 0 | -2 | -11 |
| [d:\\Mern stack\\Clinivo\\backend\\utils\\Generate\_Token.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cutils%5CGenerate_Token.js) | JavaScript | -19 | 0 | -9 | -28 |
| [d:\\Mern stack\\Clinivo\\backend\\validations\\ClinicValidation.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cvalidations%5CClinicValidation.js) | JavaScript | -12 | 0 | -1 | -13 |
| [d:\\Mern stack\\Clinivo\\backend\\validations\\DoctorFormValidation.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cvalidations%5CDoctorFormValidation.js) | JavaScript | -30 | 0 | -1 | -31 |
| [d:\\Mern stack\\Clinivo\\backend\\validations\\authSchema.js](/d:%5CMern%20stack%5CClinivo%5Cbackend%5Cvalidations%5CauthSchema.js) | JavaScript | -6 | -1 | -5 | -12 |
| [d:\\Mern stack\\Clinivo\\frontend\\.env](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5C.env) | Dotenv | -1 | 0 | 0 | -1 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Admin.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CAdmin.jsx) | JavaScript JSX | -90 | -7 | -38 | -135 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Appointments.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CAppointments.jsx) | JavaScript JSX | -874 | -78 | -257 | -1,209 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Clinic.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CClinic.jsx) | JavaScript JSX | -92 | 0 | -34 | -126 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Dashboard.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CDashboard.jsx) | JavaScript JSX | -420 | -10 | -55 | -485 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Doctors.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CDoctors.jsx) | JavaScript JSX | -831 | -48 | -214 | -1,093 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Receptionists.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CReceptionists.jsx) | JavaScript JSX | -562 | -65 | -388 | -1,015 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Signin.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CSignin.jsx) | JavaScript JSX | -94 | 0 | -30 | -124 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Admin\\Pages\\Signup.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CAdmin%5CPages%5CSignup.jsx) | JavaScript JSX | -98 | 0 | -31 | -129 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Doctor\\Doctor.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CDoctor%5CDoctor.jsx) | JavaScript JSX | -896 | -30 | -88 | -1,014 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Doctor\\Pages\\Signin.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CDoctor%5CPages%5CSignin.jsx) | JavaScript JSX | -99 | 0 | -27 | -126 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Components\\DeserveBetter.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CComponents%5CDeserveBetter.jsx) | JavaScript JSX | -22 | 0 | -6 | -28 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Components\\Features.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CComponents%5CFeatures.jsx) | JavaScript JSX | -77 | -1 | -14 | -92 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Components\\Footer.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CComponents%5CFooter.jsx) | JavaScript JSX | -92 | 0 | -23 | -115 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Components\\HowITWorks.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CComponents%5CHowITWorks.jsx) | JavaScript JSX | -53 | 0 | -13 | -66 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Components\\Pricing.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CComponents%5CPricing.jsx) | JavaScript JSX | -135 | 0 | -11 | -146 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Home\\Home.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CHome%5CHome.jsx) | JavaScript JSX | -113 | -4 | -31 | -148 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Receptionist\\Pages\\Signin.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CReceptionist%5CPages%5CSignin.jsx) | JavaScript JSX | -104 | 0 | -33 | -137 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Receptionist\\Receptionist.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CReceptionist%5CReceptionist.jsx) | JavaScript JSX | -1,070 | -35 | -100 | -1,205 |
| [d:\\Mern stack\\Clinivo\\frontend\\Pages\\Unauthorized.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CPages%5CUnauthorized.jsx) | JavaScript JSX | -48 | -5 | -17 | -70 |
| [d:\\Mern stack\\Clinivo\\frontend\\README.md](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5CREADME.md) | Markdown | -9 | 0 | -8 | -17 |
| [d:\\Mern stack\\Clinivo\\frontend\\eslint.config.js](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Ceslint.config.js) | JavaScript | -20 | 0 | -2 | -22 |
| [d:\\Mern stack\\Clinivo\\frontend\\index.html](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cindex.html) | HTML | -12 | 0 | -1 | -13 |
| [d:\\Mern stack\\Clinivo\\frontend\\package-lock.json](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cpackage-lock.json) | JSON | -4,458 | 0 | -1 | -4,459 |
| [d:\\Mern stack\\Clinivo\\frontend\\package.json](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cpackage.json) | JSON | -43 | 0 | -1 | -44 |
| [d:\\Mern stack\\Clinivo\\frontend\\public\\favicon.svg](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cpublic%5Cfavicon.svg) | XML | -1 | 0 | 0 | -1 |
| [d:\\Mern stack\\Clinivo\\frontend\\public\\icons.svg](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cpublic%5Cicons.svg) | XML | -24 | 0 | -1 | -25 |
| [d:\\Mern stack\\Clinivo\\frontend\\services\\api.js](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cservices%5Capi.js) | JavaScript | -74 | -7 | -27 | -108 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\.env](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5C.env) | Dotenv | 0 | 0 | -1 | -1 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\App.css](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5CApp.css) | PostCSS | 0 | 0 | -1 | -1 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\App.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5CApp.jsx) | JavaScript JSX | -69 | -12 | -36 | -117 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\Components\\ProtectedRoute.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5CComponents%5CProtectedRoute.jsx) | JavaScript JSX | -30 | -4 | -16 | -50 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\assets\\react.svg](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cassets%5Creact.svg) | XML | -1 | 0 | 0 | -1 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\assets\\vite.svg](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cassets%5Cvite.svg) | XML | -1 | 0 | -1 | -2 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\index.css](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cindex.css) | PostCSS | -24 | 0 | -6 | -30 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\main.jsx](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cmain.jsx) | JavaScript JSX | -16 | 0 | -3 | -19 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\store\\slices\\authSlice.js](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cstore%5Cslices%5CauthSlice.js) | JavaScript | -174 | -7 | -67 | -248 |
| [d:\\Mern stack\\Clinivo\\frontend\\src\\store\\store.js](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Csrc%5Cstore%5Cstore.js) | JavaScript | -7 | 0 | -1 | -8 |
| [d:\\Mern stack\\Clinivo\\frontend\\vite.config.js](/d:%5CMern%20stack%5CClinivo%5Cfrontend%5Cvite.config.js) | JavaScript | -9 | -1 | -4 | -14 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details