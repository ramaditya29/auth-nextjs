import React from "react"

export default function ProfilePage({ params }: { params: { id: string } }) {
    const { id } = params
    return <div>ProfilePage {id}</div>
}
