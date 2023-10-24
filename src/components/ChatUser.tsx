import { FC } from "react";

interface Props {
    name: string;
    avatar: string;
    message: string;
    time: string;
}

const ChatUser: FC<Props> = (props) => {
    return (
        <div>
            {props.name}
            {props.avatar}
            {props.message}
            {props.time}
        </div>
    );
};

export default ChatUser;
