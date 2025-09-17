import { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ResizableContainer.css';

interface ResizableContainerProps {
    children: React.ReactNode;
    maxHeight?: number;
    defaultHeight?: number;
}

const ResizableContainer: React.FC<ResizableContainerProps> = ({
    children,
    maxHeight = 800,
    defaultHeight = 0.2,
}) => {
    const [height, setHeight] = useState(window.innerHeight * defaultHeight);

    const handleResize = (event: any, { size }: { size: { height: number } }) => {
        setHeight(size.height);
    };

    return (
        <div className="resizable-container">
            <Resizable
                height={height}
                width={Infinity}
                onResize={handleResize}
                resizeHandles={['s']}
                minConstraints={[Infinity, 100]}
                maxConstraints={[Infinity, maxHeight]}
            >
                <div style={{ height: '100%',}}>
                    {children}
                </div>
            </Resizable>
        </div>
    );
};

export default ResizableContainer;
