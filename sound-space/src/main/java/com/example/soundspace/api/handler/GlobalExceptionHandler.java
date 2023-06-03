package com.example.soundspace.api.handler;

import com.example.soundspace.api.v1.dto.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Response response;

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException ex) {
        String errorMessage = ex.getConstraintViolations().iterator().next().getMessage();
        return response.fail(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
