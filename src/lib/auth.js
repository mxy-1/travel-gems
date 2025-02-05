import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db"
import { Users } from "@/models/users"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";


const login = async (credentials) => {
    try {
        connectToDatabase()

        const user = await Users.findOne({username: credentials.username})

        if(!user) {
            throw new Error("User does not exist")
        }
        
        const isPasswordCorrect = await bcrypt.compare(
            credentials.password, 
            user.password
            )

        if (!isPasswordCorrect) {
            throw new Error("Password is incorrect")
        }

        return user

    } catch (err) {
        console.log(err)
        throw new Error("Failed to login")
    }
}

export const authOptions = {
    ...authConfig,
    providers: 
    [ 
        // GitHub({ 
        //     clientId: process.env.GITHUB_ID, 
        //     clientSecret: process.env.GITHUB_SECRET 
        // }),
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials)
                    return user
                } catch (err) {
                    return null
                }
            }
        })
    ],
    // callbacks: {
    //     async signIn({user, account, profile}) {
    //         if (account.provider === 'github') {
    //             connectToDatabase();

    //             try {
    //                 const user = await Users.findOne({email: profile.email})

    //                 if (!user) {
    //                     const newUser = new Users({
    //                         username: profile.login,
    //                         email: profile.email,
    //                         img: profile.avatar_url,
    //                     })

    //                     await newUser.save();
    //                 }
    //             } catch (err) {
    //                 console.log(err)
    //                 return false
    //             }
    //         }
    //         return true
    //     },
    //     ...authConfig.callbacks
    // }
}

export const nextAuth = NextAuth(authOptions)

export const { handlers : { GET, POST }, auth, signIn, signOut } = nextAuth