package com.trf.common.config;

import ch.qos.logback.classic.pattern.ClassicConverter;
import ch.qos.logback.classic.spi.ILoggingEvent;
import org.springframework.stereotype.Component;

@Component

public class LogLocalization extends ClassicConverter {

    @Override
    public String convert(ILoggingEvent event) {
        String loggerName = event.getLoggerName();
        int lastDotIndex = loggerName.lastIndexOf(".");
        String fileName;
        String lineNumber;
        StackTraceElement[] cda = event.getCallerData();
        if (cda != null && cda.length > 0) {
            fileName= cda[0].getFileName();
            lineNumber= String.valueOf(cda[0].getLineNumber());
        } else {
            fileName= "UnknownFile";
            lineNumber= "";
        }

        return (lastDotIndex != -1 ? loggerName.substring(0, lastDotIndex) : loggerName)+"("+fileName+":"+lineNumber+")";
    }
}
