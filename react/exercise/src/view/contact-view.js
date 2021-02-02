import { Segment } from "semantic-ui-react";
import { ContactContextProvider } from "../context/contact-context";

export default function Contacts() {
    return (
        <ContactContextProvider>
            <Segment basic>
                <Header as='h3'>Contact</Header>
            </Segment>
        </ContactContextProvider>
    )
}