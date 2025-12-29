import { 
    View,
    Text,
    ScrollView,
    StyleSheet 
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export function Privacy(){

    return(
        <ScrollView style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>
                    <Text style={{fontWeight: 'bold'}}>Privacy Policy for ContractNet</Text>
                    {'\n'}
                    {'\n'}
                    <Text>Last Updated: 07/04/2026</Text>
                    {'\n'}
                    {'\n'}
                    ContractNet is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services. Please read this policy carefully.
                    {'\n'}
                    {'\n'}

                    <Text style={{fontWeight: '600'}}>1. Information We Collect</Text>
                    {'\n'}
                    {'\n'}
                    1.1 Personal Information
                    {'\n'}
                    We may collect the following personal data when you register or use the App:
                    {'\n'}
                    * Full name{'\n'}
                    * Email address{'\n'}
                    * Phone number{'\n'}
                    * Profile photo{'\n'}
                    * Payment information (handled securely through third-party payment processors)
                    {'\n'}
                    {'\n'}
                    1.2 Usage Data
                    {'\n'}
                    This may include:
                    {'\n'}
                    * App activity (features used, screens visited){'\n'}
                    * IP address{'\n'}
                    * Log data and crash analytics{'\n'}
                    {'\n'}
                    1.3 Content You Provide
                    {'\n'}
                    * Job postings{'\n'}
                    * Bids, proposals, and messages{'\n'}
                    {'\n'}
                    1.4 Third-Party Data{'\n'}

                    If you choose to sign in using Google, Apple, Facebook, or another provider, we may receive information such as:
                    {'\n'}
                    * Name{'\n'}
                    * Email{'\n'}
                    * Profile picture{'\n'}
                    {'\n'}


                    <Text style={{fontWeight: '600'}}>2. How We Use Your Information</Text>
                    {'\n'}
                    We use collected data to:
                    {'\n'}
                    * Create and manage user accounts{'\n'}
                    * Enable job posting, bidding, messaging, and payments{'\n'}
                    * Improve app performance and user experience{'\n'}
                    * Personalize content and features{'\n'}
                    * Detect fraud, ensure security, and enforce policies{'\n'}
                    * Provide customer support
                    {'\n'}
                    {'\n'}

                    <Text style={{fontWeight: '600'}}>3. Sharing Your Information</Text>
                    {'\n'}
                    We may share information with:
                    {'\n'}
                    {'\n'}
                    3.1 Service Providers
                    {'\n'}
                    * Payment processors{'\n'}
                    * Cloud hosting services{'\n'}
                    * Analytics and crash reporting tools{'\n'}
                    * Identity verification services{'\n'}
                    {'\n'}

                    3.2 Other Users
                    {'\n'}
                    Information such as your profile, name, rating, and job history may be visible to other users within the app.
                    {'\n'}
                    {'\n'}
                    3.3 Legal Obligations
                    {'\n'}
                    We may disclose information if required by:
                    {'\n'}
                    * Law enforcement{'\n'}
                    * Court orders{'\n'}
                    * Government requests{'\n'}
                    {'\n'}
                    {'\n'}
                    3.4 Business Transfers
                    {'\n'}
                    If we merge, acquire, or transfer company assets, your data may be included.
                    {'\n'}
                    {'\n'}

                    <Text style={{fontWeight: '600'}}>4. Data Security</Text>
                    {'\n'}
                    We implement appropriate technical and organizational security measures to protect your personal information.
                    However, no system is completely secure, and we cannot guarantee absolute security.

                    {'\n'}
                    {'\n'}
                    <Text style={{fontWeight: '600'}}>5. Children's Privacy</Text>
                    {'\n'}
                    ContractNet is not intended for individuals under **16 years**. 
                    If you believe a minor has provided us with data, contact us.

                    {'\n'}
                    {'\n'}
                    <Text style={{fontWeight: '600'}}>6. Your Privacy Rights</Text>
                    {'\n'}
                    Depending on your location, you may have the right to:
                    {'\n'}
                    * Access the data we hold about you{'\n'}
                    * Request corrections or updates{'\n'}
                    * Delete your account or personal data{'\n'}
                    * Opt out of marketing communications{'\n'}
                    * Withdraw consent where applicable{'\n'}

                    To exercise these rights, contact us.
                    {'\n'}
                    {'\n'}

                    <Text style={{fontWeight: '600'}}>7. Data Retention</Text>
                    {'\n'}
                    We retain your information:
                    {'\n'}
                    * As long as your account is active{'\n'}
                    * As necessary to provide services{'\n'}
                    * As required to comply with legal obligations{'\n'}

                    When your data is no longer needed, we securely delete or anonymize it.
                    {'\n'}
                    {'\n'}

                    <Text style={{fontWeight: '600'}}>8. Third-Party Links</Text>
                    {'\n'}
                    Our App may contain links to third-party websites or services.{'\n'}
                    We are not responsible for their privacy practices or content.{'\n'}
                    {'\n'}


                    <Text style={{fontWeight: '600'}}>9. International Data Transfers</Text>
                    {'\n'}
                    Your information may be transferred to and stored on servers outside your country.{'\n'}
                    We take steps to ensure data protection laws are followed during such transfers.{'\n'}
                    {'\n'}
                    

                    <Text style={{fontWeight: '600'}}>10. Changes to This Policy</Text>
                    {'\n'}
                    We may update this Privacy Policy from time to time.{'\n'}
                    We will notify you by:
                    {'\n'}

                    * Updating the “Last Updated” date, and{'\n'}
                    * Sending an in-app notification where appropriate{'\n'}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textView: {
        padding: 5,
        margin: 5,
        marginTop: hp('5%'),
        marginBottom: hp('10%'),
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        justifyContent: 'space-evenly'
    }
});

//TERM AND CONDITIONS
/*
Sure — here’s a clean, professional **Terms & Conditions** document for your freelancing mobile app.
Replace placeholders like **[App Name]**, **[Company Name]**, **[Contact Email]**, etc.

---

# **Terms & Conditions for [App Name]**

**Last Updated:** [Date]

Welcome to **[App Name]** (“App”). These Terms & Conditions (“Terms”) govern your use of our mobile application and services (“Services”). By creating an account or using the App, you agree to abide by these Terms. If you do not agree, please do not use the App.

---

# **1. Acceptance of Terms**

By accessing or using [App Name], you confirm that you:

* Are at least **18 years old**
* Have the legal capacity to enter into a binding agreement
* Agree to comply with all rules, policies, and laws applicable to your use of the App

---

# **2. User Accounts**

### **2.1 Registration**

To use certain features, you must create an account and provide accurate information. You agree to:

* Not use false identities
* Keep your login details secure
* Update your information when necessary

### **2.2 Account Responsibility**

You are responsible for:

* All activities under your account
* Maintaining confidentiality of your password
* Immediately notifying us of unauthorized access

We may suspend or terminate accounts that violate these Terms.

---

# **3. User Roles**

The App connects:

* **Clients** who post jobs
* **Freelancers** who submit bids and perform services

Both parties agree to communicate honestly, behave respectfully, and complete transactions in good faith.

---

# **4. Posting Jobs & Submitting Proposals**

### **4.1 Clients**

Clients agree to:

* Post clear, truthful job descriptions
* Set fair expectations and deliverables
* Pay freelancers promptly once work is approved

### **4.2 Freelancers**

Freelancers agree to:

* Submit accurate proposals
* Deliver work on time and as agreed
* Maintain professional communication

Misrepresentation or fraud may result in account termination.

---

# **5. Payments**

### **5.1 Payment Processing**

All payments are handled securely through trusted third-party payment processors.

### **5.2 Fees**

The App may charge fees to freelancers, clients, or both.
Fee structures will be clearly displayed before transactions.

### **5.3 Disputes**

If a disagreement arises:

* Users should try to resolve it directly
* If that fails, users may request mediation through the App

The App may make a final decision in disputes where needed.

---

# **6. Content Guidelines**

Users may upload content such as:

* Job descriptions
* Proposals
* Messages
* Files

You agree not to upload:

* Illegal, harmful, or abusive content
* Discriminatory or hateful content
* Malware or harmful code
* Copyrighted material without permission

We may remove content that violates these rules.

---

# **7. Prohibited Activities**

You agree NOT to:

* Misuse the App for fraud, scams, or illegal activity
* Create multiple fake accounts
* Circumvent payment systems
* Reverse-engineer or exploit the App
* Harass or threaten other users

Violations may result in account termination or legal action.

---

# **8. Intellectual Property**

All trademarks, logos, designs, text, and software used in the App are owned by or licensed to **[Company Name]**.

You may not:

* Copy or redistribute the App’s content
* Use our brand without permission
* Modify or attempt to reproduce the App’s source code

---

# **9. Ratings & Reviews**

Users may leave ratings and reviews.
You agree that:

* Reviews must be honest
* Fake or manipulative reviews are prohibited
* We may remove reviews that violate policies

---

# **10. Service Availability**

We strive to keep the App running reliably but do not guarantee:

* Continuous availability
* Error-free functionality
* Immediate fixes or support

We may modify or discontinue features at any time.

---

# **11. Termination**

We may suspend or delete your account if you:

* Violate these Terms
* Engage in fraudulent or harmful behavior
* Misuse the App or payment system

You may also delete your account at any time through your profile settings.

---

# **12. Liability Disclaimer**

To the maximum extent permitted by law:

* We are **not liable** for losses caused by user actions, disputes, or misuse of the App.
* We do not guarantee the quality of services delivered by freelancers or clients.
* You use the App **at your own risk**.

---

# **13. Indemnification**

You agree to defend and indemnify **[Company Name]** from claims or damages arising out of:

* Your use of the App
* Your violation of these Terms
* Your infringement of third-party rights

---

# **14. Privacy**

Your use of the App is also governed by our **Privacy Policy**.
By using the App, you consent to our collection and use of data as described there.

---

# **15. Changes to Terms**

We may update these Terms occasionally.
Changes take effect once posted within the App.
Continued use means you accept the updated Terms.

---

# **16. Governing Law**

These Terms are governed by the laws of **[Country/State]**, without regard to conflict-of-law rules.

---

# **17. Contact Us**

For questions or concerns:

**[Company Name]**
Email: **[Contact Email]**
Phone: **[Optional]**
Address: **[Optional]**

---

If you want, I can:
✅ Turn this into a **PDF**
✅ Customize it based on your actual company name, country, and rules
Just tell me!

*/