import { FC } from "react";

import { useGETRequest } from "hooks/useRequest";
import { getContacts } from "api/support";
import { Contact } from "types/Contact";
import PageProgress from "components/ui/PageProgress";

import { useStyles } from "../../../style";
import { useStyles as useLocalStyles } from "./style";

const ContactsCenter: FC = () => {
  const classes = useStyles();
  const localClasses = useLocalStyles();
  const { loading, data: contacts } = useGETRequest<Contact[]>({
    api: getContacts,
  });

  if (loading) return <PageProgress />;

  return (
    <div id="supportContactCenter">
      <div className={classes.pageTitle}>Контактный центр</div>
      {contacts?.map((contact) => (
        <div>
          <a
            className={localClasses.label}
            href={`${contact.type === "email" ? "mailto" : "tel"}:0545`}
          >
            {contact.title}
          </a>
          <div className={localClasses.text}>{contact.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ContactsCenter;
