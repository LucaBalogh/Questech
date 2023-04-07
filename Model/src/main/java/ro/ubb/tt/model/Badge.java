package ro.ubb.tt.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@jakarta.persistence.Entity
@Table(name = "badges")
public class Badge extends Entity implements Serializable{

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "obtained_at")
    private String obtained_at;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"badges", "hibernateLazyInitializer"})
    private User user;

    public Badge() {}

    public Badge(@NotNull String name, @NotNull String obtained_at, User user) {
        this.name = name;
        this.obtained_at = obtained_at;
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getObtained_at() {
        return obtained_at;
    }

    public void setObtained_at(String obtained_at) {
        this.obtained_at = obtained_at;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Badge {" +
                " name = " + name +
                " obtained_at = " + obtained_at +
                " user_id = " + user.getId() +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Badge))
            return false;
        Badge other = (Badge)o;
        return (other.name.equals(this.name) && other.obtained_at.equals(this.obtained_at)  && other.user == this.user );
    }

    @Override
    public int hashCode()
    {
        return this.user.getId();
    }
}
